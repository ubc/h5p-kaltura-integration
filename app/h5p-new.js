import React from 'react';
import ReactDOM from 'react-dom';
import App from '../assets/src/js/h5p-new';
import '../assets/src/css/h5p-new.scss';


window.H5PEditorOnIframeLoaded( () => {
	if( ! document.querySelector('.h5p-editor-iframe').contentDocument.querySelector('.h5p-add-dialog-table') ) {
		return;
	}

	// Remove upload videos and vertical line
	document.querySelector('.h5p-editor-iframe').contentDocument.querySelector('.h5p-add-dialog-table > *:first-child').remove();
	document.querySelector('.h5p-editor-iframe').contentDocument.querySelector('.h5p-add-dialog-table > *:first-child').remove();

	// Add new div
	document
		.querySelector('.h5p-editor-iframe')
		.contentDocument
		.querySelector('.h5p-add-dialog-table .h5p-dialog-box')
		.insertAdjacentHTML('beforeend', '<div id=\"h5p-kultura-integration\"></div>');

	// Add styling
	document
		.querySelector('.h5p-editor-iframe')
		.contentDocument
		.querySelector('head')
		.insertAdjacentHTML('beforeend', `
			<style>
				.h5p-add-dialog-table > .h5p-dialog-box{
					width: 100% !important;
					box-sizing: border-box;
					margin: 0 !important;
					padding: 2rem !important;
				}
				.h5p-add-dialog-table > .h5p-dialog-box > *:not(#h5p-kultura-integration){
					//display: none;
				}
				.kultura-integration h3{
					text-align: left !important;
				}

				.kultura-integration h3:first-child{
					margin-top: 0 !important;
				}
				.kultura-integration select{
					width: 100%;
				}
				.h5p-notice{
					margin: 15px 0;
					padding-right: 38px;
					position: relative;
					background: #fff;
					border: 1px solid #c3c4c7;
					border-left-width: 4px;
					padding: 1px 12px;
				  }
				  .h5p-notice.valid{
					border-left-color: #00a32a;
				  }
				  .h5p-notice.invalid{
					border-left-color: #B32D2E;
				  }
				  .h5p-notice p{
					margin: 0.5em 0 !important;
					padding: 2px;
					padding-right: 20px;
				  }
			</style>
		`);

	ReactDOM.render(
		<App tags={[]} />,
		// eslint-disable-next-line no-undef
		document.querySelector('.h5p-editor-iframe').contentDocument.getElementById('h5p-kultura-integration')
	);
	
})