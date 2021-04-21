<?php

namespace IIIFWP\App;

class Block
{

    /**
     * Listing constructor.
     */

    function __construct()
    {

        /*
         *  utk_calendar shortcode
         */

        add_action('acf/init', [__CLASS__, 'iiifwp_blocks_init']);

    }

    public static function iiifwp_blocks_init() {
        if( function_exists('acf_register_block_type') ) {
            acf_register_block_type(array(
                'name'              => 'iiif-wp',
                'title'             => __('IIIF WP'),
                'description'       => __('A block for rendering IIIF-WP components.'),
                'render_callback'   => [__CLASS__, 'acf_register_blocks_callback'],
                'mode'              => 'edit',
                'category'          => 'formatting',
            ));
        }
    }

    public static function acf_register_blocks_callback( $block ) {

        // convert name into path friendly slug
        $slug = str_replace('acf/', '', $block['name']);

        // include a template
        if( file_exists( dirname(__FILE__) . "/components/block-{$slug}.php") ) {
            include( dirname(__FILE__) . "/components/block-{$slug}.php" );
        }

    }

}