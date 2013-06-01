extjs-GridMaskBinder
====================

MaskBinder for ExtJS 4.x, a plugin used by grid to fix the LoadMask position issue.
By default, grid use LoadMask to achieve the mask effect during store loading.
But the mask remains in the initial position, if the parent container scrolls or the grid is being dragged.
That's because the LoadMask component is created under body level,the grid markup changes won't affect the mask component.
While the Element.mask will render the mask component directly in the Element dom, so this plugin uses the Element.mask to fix this problem.

