<div class="collection {{ block.settings.layout }}">
  ...
</div>

{% stylesheet %}
  .collection--full-width {
    /* multiple styles */
  }
  .collection--narrow {
    /* multiple styles */
  }
{% endstylesheet %}

{% schema %}
{
  "settings": [{
    "type": "select",
    "id": "layout",
    "label": "layout",
    "values": [
      { "value": "collection--full-width", "label": "t:options.full" },
      { "value": "collection--narrow", "label": "t:options.narrow" }
    ]
  }]
}
{% endschema %}