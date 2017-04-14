# cl-brand-guidelines

Pages will always have structural sections - top level positioning pieces: header, content/body & footer

Some of these piece requirement flexibility within themselves to position other components and content
.page-header: .page-header__branding, .page-header__navigation, etc...
.page-footer: .page-footer__branding, .page-footer__navigation, .page-footer__copyright

So we feel/think all components should be required to go inside one of these page structural sections - except skip-nav, b/c it is an absolutely positioned piece that won't get the in the way of the .page flex flow.  And global alert may possibly be an except or we work it into the top/header portion of the page - this component would still need to be flexed if allowed to live at the .page level.

.page-content is where a dev would place all the meat of their page.
components added to page-content would be full-width by default. If a column layout is needed for the content - then a row component would be added - the row would be full width and should have sub-elements of column-items that could vary in width somehow. The row is for making columns so it should require column sub-elements

need to be more clear about skip-nav id assignment