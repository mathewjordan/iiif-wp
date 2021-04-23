<?php

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
        $canvas = $manifest->items[0]->items[0]->items[0]->body->id;
        $canvas = str_replace('/full/full', '/full/!640,640', $canvas);
    endif;
else :
    $presentation = 2;
    $label = $manifest->label;
    $summary = $manifest->decription;
    $canvas = $manifest->sequences[0]->canvases[0]->images[0]->resource->{'@id'};
    $canvas = str_replace('/full/full', '/full/640,640', $canvas);
endif;

?>
<style type="text/css">

    .iiif-wp {
        margin-bottom: 3em;
    }

    .iiif-wp--actions {
        display: flex;
        flex-direction: column;
        font-size: 0.85em;
        margin-top: 1em;
    }

</style>

<div class="iiif-wp"
     id="<?php print $block['id']; ?>">
    <div class="iiif-wp-viewer"
         id="iiif-wp-viewer-<?php print str_replace('block_', '', $block['id']); ?>"
         data-manifest="<?php print $fields['manifest']; ?>"
         data-viewer="<?php print $fields['viewer']; ?>">
    </div>
    <?php if ($fields['mode'] === 'preview') : ?>
        <figure>
            <img src="<?php print $canvas; ?>"
                 alt="<?php print $label; ?>" />
            <figcaption>
                <span><strong><?php print $label; ?></strong></span>
                <?php if ($summary) : ?>
                    <p><?php print $summary; ?></p>
                <?php endif; ?>
            </figcaption>
        </figure>
        <div class="iiif-wp-actions">
            <a href="#viewer">Expand in Viewer</a>
        </div>
    <?php endif; ?>
</div>
