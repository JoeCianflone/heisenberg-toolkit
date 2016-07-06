function $$(el, base) {
   var b = (! base) ? document : base;
   if (el.startsWith("#")) {
      return document.getElementById(el.replace("#", ""));
   }

   return b.querySelectorAll(el);
}
