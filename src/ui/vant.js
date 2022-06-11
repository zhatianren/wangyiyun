import {
  Button,
  Swipe,
  SwipeItem,
  Lazyload,
  Icon,
  Popup,
  Dialog,
  Search,
  Tag,
  Form,
  Field,
  CellGroup,
  Toast,
} from "vant";
let plugins = [
  Button,
  Swipe,
  SwipeItem,
  Lazyload,
  Icon,
  Popup,
  Dialog,
  Search,
  Tag,
  Form,
  Field,
  CellGroup,
  Toast,
];
export default function getVant(app) {
  plugins.forEach((item) => {
    return app.use(item);
  });
}
