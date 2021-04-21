<?php

/*
Plugin Name: IIIF-WP
Plugin URI: https://github.com/mathewjordan/iiif-wp
Description: Pilot idea of display of IIIF in WordPress
Version: 0.0.1
Author: mat@utk.edu
Author URI: https://github.com/mathewjordan
*/

// If this file is called directly, abort.
if (!defined('WPINC')) {
    die;
}

require ('vendor/autoload.php');

function run() {
    $plugin = new IIIFWP\App();
    $plugin->run();
}

run();
