<?php
/**
 * Kaltura Integration class.
 *
 * @since 1.0.0
 * @package ubc-h5p-kaltura-integration
 */

namespace UBC\H5P\KalturaIntegration;

/**
 * Class to initiate Kaltura Integration functionalities
 */
class KalturaIntegration {

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 */
	public function __construct() {
		add_action( 'load-h5p-content_page_h5p_new', array( $this, 'enqueue_add_new_content_script' ), 10 );
		add_action( 'wp_ajax_ubc_h5p_kaltura_verify_source', array( $this, 'kaltura_verify_source' ) );
	}

	/**
	 * Load assets for h5p new content page.
	 *
	 * @return void
	 */
	public function enqueue_add_new_content_script() {
		if ( ! ( isset( $_GET['page'] ) && 'h5p_new' === $_GET['page'] ) ) {
			return;
		}

		wp_enqueue_script(
			'ubc-h5p-kaltura-integration-js',
			H5P_KALTURA_INTEGRATION_PLUGIN_URL . 'assets/dist/js/h5p-new.js',
			array(),
			filemtime( H5P_KALTURA_INTEGRATION_PLUGIN_DIR . 'assets/dist/js/h5p-new.js' ),
			true
		);

		wp_localize_script(
			'ubc-h5p-kaltura-integration-js',
			'ubc_h5p_kaltura_integration_admin',
			array(
				'security_nonce' => wp_create_nonce( 'security' ),
				'plugin_url'     => H5P_KALTURA_INTEGRATION_PLUGIN_URL,
			)
		);
	}//end enqueue_add_new_content_script()

	/**
	 * Ajax handler to verify if the source video is available.
	 *
	 * @return void
	 */
	public function kaltura_verify_source() {
		check_ajax_referer( 'security', 'nonce' );

		$video_url = isset( $_POST['video_url'] ) ? esc_url_raw( wp_unslash( $_POST['video_url'] ) ) : null;
		$response  = wp_remote_get( $video_url );
		$header    = wp_remote_retrieve_header( $response, 'content-type' );

		if ( isset( $response['response'] ) && isset( $response['response']['code'] ) && 200 !== $response['response']['code'] ) {
			wp_send_json(
				array(
					'valid'   => false,
					'message' => __( 'Error. Video ID Invalid. Please see how to find the ID for your videos uploaded to Kaltura.', 'ubc-h5p-addon-kaltura-integration' ),
				)
			);
		}

		$header = wp_remote_retrieve_header( $response, 'content-type' );
		if ( 'video/mp4' !== $header ) {
			wp_send_json(
				array(
					'valid'   => false,
					'message' => __( 'Error. The video is not in .mp4 format.', 'ubc-h5p-addon-kaltura-integration' ),
				)
			);
		}

		wp_send_json(
			array(
				'valid'   => true,
				'message' => __( "Video ID Valid. The source URL has been generated above. Press 'Insert' to use this Kaltura video.", 'ubc-h5p-addon-kaltura-integration' ),
			)
		);

	}//end kaltura_verify_source()
}

new KalturaIntegration();
