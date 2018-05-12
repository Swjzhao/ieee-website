<?php
// $Id: block.tpl.php,v 1.1.4.10 2008/11/28 06:18:46 andregriffin Exp $
?>
<div id="block-<?php print $block->module .'-'. $block->delta; ?>" class="block block-<?php print $block->module ?>">

  <?php if ($block->subject): ?>
    <h3><?php print $block->subject ?></h3>
  <?php endif;?>

  <div class="content">
    <?php print $block->content ?>
  </div>

</div>
