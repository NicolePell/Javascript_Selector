var $ = function (selector) {

  var i, len, current_collection, element, returned_nodes, returned_array = [], functions;

  if(selector.indexOf('#') > 0) {
    selector = selector.split('#');
    selector = '#' + selector[selector.length -1];
  };
  selector = selector.split(' ');

  fns = {
    id: function(sel) {
      return document.getElementById(sel);
    },
    get: function(class_or_element, sel, returned_nodes) {
      var i = 0, len, arr = [], get_what = (class_or_element === 'class') ? 'getElementsByClassName' : 'getElementsByTagName';
      if(returned_nodes.length) {
        while(returned_nodes[i]) { Array.prototype.push.apply(arr, Array.prototype.slice.call(returned_nodes[i++][get_what](sel)));
        }
      } else {
        arr = returned_nodes[get_what](sel);
      }
      return(arr.length === 1) ? arr[0] : arr;
    }
  };

  len = selector.length;
  current_collection = document;

  for(i = 0; i < len; i++) {

    element = selector[i];
    returned_nodes = current_collection;

    if(element.indexOf('#') === 0) {
      current_collection = fns.id(element.split('#')[1]);
    } else if(element.indexOf('.') > -1) {
      element = element.split('.');
      if(element[0]) {
        returned_nodes = fns.get('elements', element[0], returned_nodes);
        if(returned_nodes.length) {
          for(i = 0; returned_nodes[i]; i++) {
            if(returned_nodes[i].className.indexOf(element[1]) > -1) {
              returned_array.push(returned.nodes[i]);
            }
          }
          current_collection = returned_array;
        } else {
          current_collection = (returned_nodes.className.indexOf(element[1]) > -1) ? returned_nodes : [];
        }
      } else {
        current_collection = fns.get('class', element[1], returned_nodes);
      }
    } else {
      current_collection = fns.get('elements', element, returned_nodes);
    }
  }
  return current_collection;
};
