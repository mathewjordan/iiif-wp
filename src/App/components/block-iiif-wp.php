<?php

use IIIFWP\App\Block;

/**
 * Block Name: IIIF WP
 **/

$fields = get_fields();

$uri = $fields['manifest'];
$manifest = json_decode(file_get_contents($uri));

$context = $manifest->{'@context'};

if (is_array($context)) :
    if (in_array('https://iiif.io/api/presentation/3/context.json', $context)) :
        $presentation = 3;
        $label = $manifest->label->en[0];
        $summary = $manifest->summary->en[0];
        $canvas = $manifest->items[0]->items[0]->items[0]->body[0]->id;
        $preview = str_replace('/full/full', '/full/!640,640', $canvas);
    endif;
else :
    $presentation = 2;
    $label = $manifest->label;
    $summary = $manifest->decription;
    $canvas = $manifest->sequences[0]->canvases[0]->images[0]->resource->{'@id'};
    $preview = str_replace('/full/full', '/full/640,640', $canvas);
endif;

?>
<div class="iiif-wp"
     id="<?php print $block['id']; ?>">
    <div class="iiif-wp-viewer"
         id="iiif-wp-viewer-<?php print str_replace('block_', '', $block['id']); ?>"
         data-label="<?php print $label; ?>"
         data-preview="<?php print $preview; ?>"
         data-summary="<?php print $summary; ?>"
         data-manifest="<?php print $fields['manifest']; ?>"
         data-viewer="<?php print $fields['viewer']; ?>"
         data-mode="<?php print $fields['mode']; ?>">
    </div>
    <?php if (Block::is_post_editor()) : ?>
        <figure>
            <img src="<?php print $preview; ?>"
                 alt="<?php print $label; ?>" />
            <figcaption>
                <span><strong><?php print $label; ?></strong></span>
                <?php if ($summary) : ?>
                    <p><?php print $summary; ?></p>
                <?php endif; ?>
            </figcaption>
        </figure>
    <?php endif; ?>
</div>
