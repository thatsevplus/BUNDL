<div class="collection" style="--gap: {{ block.settings.gap }}px">
  ...
</div>

{% stylesheet %}
  .collection {
    gap: var(--gap);
  }
{% endstylesheet %}

{% schema %}
{
  "settings": [{
    "type": "range",
    "label": "gap",
    "id": "gap",
    "min": 0,
    "max": 100,
    "unit": "px",
    "default": 0,
  }]
}
{% endschema %}