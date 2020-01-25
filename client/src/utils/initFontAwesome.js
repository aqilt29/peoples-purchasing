import { library } from "@fortawesome/fontawesome-svg-core";
import { faLink, faPowerOff, faUser, faAngry } from "@fortawesome/free-solid-svg-icons";

function initFontAwesome() {
  library.add(faLink);
  library.add(faUser);
  library.add(faPowerOff);
  library.add(faAngry);
}

export default initFontAwesome;
