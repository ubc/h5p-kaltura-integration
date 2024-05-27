# H5P Addon - Kalture Integration
**this add-on adds extra functionality on top of H5P WordPress plugin. Please make sure the H5P plugin is installed and activated.*

this add-on provides UI for users to pull video from UBC Kalture and embed into h5p contents.

### Local Environment
Install node packages
`npm install`

Start building JS and CSS for development
`npm start`

Build JS and CSS for production
`npm build`

Install phpcs with WordPress coding standard
`composer install`

## Change Log

### 1.0.10
- Seprate UI between Audio and Video to allow it to work within embeded elements.

### 1.0.9
- Added support for Audio files. Might not be an optimized solution, but works for now.

### 1.0.8
- Update Kaltura server connections to the cloud instance.

### 1.0.7
- Use wp_remote_head function when validating the media URL to prevent large video times out the HTTP request.

### 1.0.6
- Improve the way to determine if there's a video upload field need to be replace on page load. This should make the script serve a more general case and work for all content types theoratically.