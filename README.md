extjs-GridMaskBinder
====================

MaskBinder for ExtJS 4.x, a plugin used by grid to fix the LoadMask position issue.
By default, grid use LoadMask to achieve the mask effect during store loading.
But the mask remains at the initial position when the parent container scrolls or the grid is being dragged.
That's because the LoadMask dom is created under body level (outside grid dom),the grid dom changes won't affect the mask dom.
While the Element.mask will render the mask directly in the Element dom, so this plugin uses the Element.mask to fix this problem.

