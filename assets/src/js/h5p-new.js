import React, { useEffect, useState } from 'react';

const VIDEO_FORMAT = {
    0: 'Raw Video',
    2: 'Basic/Small',
    4: 'SD/Small',
    5: 'SD/Large',
    7: 'HD/1080'
}

const KALTURA_SERVICE_URL     = 'admin.video.ubc.ca';
const KALTURA_PARTNER_ID      = '113';
const KALTURA_STRAMING_FORMAT = 'download';
const KALTURA_PROTOCOL        = 'https'

export default () => {
    const [kalturaID, setKalturaID] = useState('');
    const [kalturaFormat, setKalturaFormat] = useState(7);
    const [isVisible, setIsVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [isValid, setIsValid] = useState(null);
    const [isInputDisabled, setIsInputdisabled] = useState(false);

    const inputElement = document.querySelector('.h5p-editor-iframe').contentDocument.querySelector('.h5p-add-dialog-table .h5p-file-url');

    useEffect(() => {
        const insertButton = document.querySelector('.h5p-editor-iframe').contentDocument.querySelector('.h5p-add-dialog .h5p-insert');
        const cancelButton = document.querySelector('.h5p-editor-iframe').contentDocument.querySelector('.h5p-add-dialog .h5p-cancel');

        insertButton.addEventListener('click', () => {
            resetStates();
        })

        cancelButton.addEventListener('click', () => {
            resetStates();
        })
    }, [])

    const resetStates = () => {
        setKalturaID('');
        setKalturaFormat(7);
        setIsVisible(false);
        setMessage('');
        setIsValid(false);
        setIsInputdisabled(false);
    }

    const generateKalturaVideoURL = async () => {
        if( ! kalturaID ) {
            setIsValid(false);
            setMessage('Kaltura video ID is required.');
            return;
        }

        const videoUrl = `https://${KALTURA_SERVICE_URL}/p/${KALTURA_PARTNER_ID}/sp/0/playManifest/entryId/${kalturaID}/format/${KALTURA_STRAMING_FORMAT}/protocol/${KALTURA_PROTOCOL}/flavorParamIds/${kalturaFormat}`;

        let formData = new FormData();

        formData.append( 'action', 'ubc_h5p_kaltura_verify_source' );
        formData.append( 'nonce', ubc_h5p_kaltura_integration_admin.security_nonce );
        formData.append( 'video_url', videoUrl );

        setActionsDisabled();

        let response = await fetch(ajaxurl, {
            method: 'POST',
            body: formData
        })
        response = await response.json();

        setActionsEnabled();
        setIsValid(response.valid);
        setMessage(response.message);

        inputElement.value = response.valid ? videoUrl : '';
    }

    const setActionsDisabled = () => {
        const insertButton = document.querySelector('.h5p-editor-iframe').contentDocument.querySelector('.h5p-add-dialog .h5p-insert');
        const cancelButton = document.querySelector('.h5p-editor-iframe').contentDocument.querySelector('.h5p-add-dialog .h5p-cancel');

        setIsInputdisabled(true);
        insertButton.disabled = true;
        cancelButton.disabled = true;
    }

    const setActionsEnabled = () => {
        const insertButton = document.querySelector('.h5p-editor-iframe').contentDocument.querySelector('.h5p-add-dialog .h5p-insert');
        const cancelButton = document.querySelector('.h5p-editor-iframe').contentDocument.querySelector('.h5p-add-dialog .h5p-cancel');

        setIsInputdisabled(false);
        insertButton.disabled = false;
        cancelButton.disabled = false;
    }

    const renderKalturaFields = () => {
        return (
            <>
                <h3>Video ID</h3>
                <input 
                    type="text" 
                    placeholder='Enter UBC kaltura video ID. Eg, 0_mxcjbk76' 
                    className="h5peditor-text" 
                    value={kalturaID}
                    onChange={e => {
                        setKalturaID( e.target.value );
                    }}
                    disabled={ isInputDisabled }
                ></input>
                <p className='h5peditor-field-description'>Please make sure the Kaltura video ID you entered is correct and click 'Generate' button</p>

                <h3>Video Format</h3>
                <select
                    onChange={e => {
                        setKalturaFormat( e.target.value );
                    }}
                    value={kalturaFormat}
                    disabled={ isInputDisabled }
                >
                    { Object.keys(VIDEO_FORMAT).map( (key, index ) => {
                        return <option key={ `video-format-option-${index}` } value={key}>{ VIDEO_FORMAT[key] }</option>
                    } ) }
                </select>
                { '' !== message ? <div className={`${ isValid ? 'valid' : 'invalid' } h5p-notice`}> 
                    <p><strong>{ message }</strong></p>
                </div> : null }

                { isInputDisabled ? <div className="loadingio-spinner-eclipse-1tbcqwrifq2">
                    <div className="ldio-zlghrr0663d">
                        <div></div>
                    </div>
                </div> : null }

                { ! isInputDisabled ? <button
                    className='h5peditor-button h5peditor-button-textual importance-high'
                    style={{
                        marginTop: '1.5rem'
                    }}
                    onClick={() => {
                        generateKalturaVideoURL();
                    }}
                >Generate</button> : null }
            </>
        );
    }

    return (
        <>
            <div className='h5p-divider'></div>
            <div className='field kultura-integration'>
                <a
                    onClick={() => {
                        setIsVisible(!isVisible);
                    }}
                    style={{
                        color: '#2579C6',
                        fontSize: '15px',
                        cursor: 'pointer'
                    }}
                >Toggle to generate UBC Kaltura video URL</a>
                <div className='h5peditor-field-description'>See how to <a href="">find the ID for you videos</a> you have uploaded to Kaltura</div>
                { isVisible ? renderKalturaFields() : null }
            </div>
        </>
    );
};