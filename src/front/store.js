export const initialStore = () => {
  return {
    message: null,
    todos: [
      {
        id: 1,
        title: "Make the bed",
        background: null,
      },
      {
        id: 2,
        title: "Do my homework",
        background: null,
      },
    ],
    showCartDropdown: false,
    // auth state
    isLoggedIn: false,
    token: null,
    cartCount: 0,
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_hello":
      return {
        ...store,
        message: action.payload,
      };

    case "add_task":
      const { id, color } = action.payload;

      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo
        ),
      };

    case "open_cart_dropdown":
      return {
        ...store,
        showCartDropdown: true,
      };

    case "close_cart_dropdown":
      return {
        ...store,
        showCartDropdown: false,
      };

    case "login":
      return {
        ...store,
        isLoggedIn: true,
        token: action.payload || null,
      };

    case "logout":
      return {
        ...store,
        isLoggedIn: false,
        token: null,
        cartCount: 0,
      };

    case "update_cart_count":
      return {
        ...store,
        cartCount: action.payload,
      };

    default:
      throw Error("Unknown action.");
  }
}
