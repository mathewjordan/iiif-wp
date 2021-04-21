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
    endif;
else :
    $presentation = 2;
    $label = $manifest->label;
    $summary = $manifest->decription;
    $canvas = $manifest->sequences[0]->canvases[0]->images[0]->resource->{'@id'};
endif;

$canvas = str_replace('/full/full', '/full/!1000,1000', $canvas);

?>
<style type="text/css">

    .iiif-wp {
        margin-bottom: 3em;
    }

    .iiif-wp-actions {
        display: flex;
        justify-content: center;
        font-size: 0.75rem;
        text-transform: uppercase;
    }

</style>

<div class="iiif-wp">
    <figure>
        <img src="<?php echo $canvas; ?>" alt="<?php echo $label; ?>" />
        <figcaption>
            <span><strong><?php echo $label; ?></strong></span>
            <?php if ($summary) : ?>
                <p><?php echo $summary; ?></p>
            <?php endif; ?>
        </figcaption>
    </figure>
    <div class="iiif-wp-actions">
        <a href="#viewer">Expand in Viewer</a>
    </div>
</div>
