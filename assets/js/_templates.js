//
/* Append selected template in selected parent */
export function swapTemplate(templateId, parentId) {
  var template = document.getElementById(templateId);
  var parent = document.getElementById(parentId);

  parent.innerHTML = "";

  parent.appendChild(document.importNode(template.content, true));
}

/* Remove selected template in selected parent (templateId not needed) */
export function removeTemplate(templateId, parentId) {
  let parent = document.getElementById(parentId);

  parent.innerHTML = "";
}
