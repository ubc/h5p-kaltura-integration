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

	// Append CSS file
	var head = document.querySelector('.h5p-editor-iframe').contentDocument.getElementsByTagName('HEAD')[0]; 
	var link = document.querySelector('.h5p-editor-iframe').contentDocument.createElement('link');

	link.rel = 'stylesheet'; 
	link.type = 'text/css';
	link.href = `${ubc_h5p_kaltura_integration_admin.plugin_url}/assets/dist/css/h5p-new.css`; 
	head.appendChild(link);

	// Render application
	ReactDOM.render(
		<App tags={[]} />,
		// eslint-disable-next-line no-undef
		document.querySelector('.h5p-editor-iframe').contentDocument.getElementById('h5p-kultura-integration')
	);
	
})