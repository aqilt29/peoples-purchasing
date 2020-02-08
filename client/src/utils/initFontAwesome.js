import { library } from "@fortawesome/fontawesome-svg-core";
import { faLink, faPowerOff, faUser, faAngry, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

function initFontAwesome() {
  library.add(faLink);
  library.add(faUser);
  library.add(faPowerOff);
  library.add(faAngry);
  library.add(faShoppingCart);
}

export default initFontAwesome;
