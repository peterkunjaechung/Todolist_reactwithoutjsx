class App extends React.Component {
    constructor() {
      super();
      this.state = { list: [
        { id: 1, title: "Buy milk", complete: true, },
        { id: 2, title: "Buy eggs", complete: false, },
        { id: 3, title: "Buy cheese", complete: false, },
      ], };
      this.addItem = this.addItem.bind(this);
      this.handleComplete = this.handleComplete.bind(this);
    };
  
    getUniqId() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
  
    addItem(item) {
      this.setState( prevState => { 
        return { 
          list: prevState.list.concat({ id: this.getUniqId(), title: item, }), 
        };
      });
    };

    handleComplete(id) {
        const list = this.state.list.map( item => {
          if (item.id === id)
            return { ...item, complete: !item.complete, };
          return item;
        });
        this.setState({ list, });
      };
  
    render() {
      return React.createElement("div", null, [
        React.createElement(ItemForm, { key: "item-form", addItem: this.addItem, }),
        React.createElement(
          TodoList, 
          { 
            key: "item-list", 
            list: this.state.list,
            handleComplete: this.handleComplete,
          })
      ]);
    };
  };

  class ItemForm extends React.Component {
    constructor() {
      super(); 
      this.state = { title: "", };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    };
  
    handleSubmit(e) {
      e.preventDefault();
      this.props.addItem(this.state.title);
      this.setState({ title: "", });
    };
  
    handleChange(e) {
      this.setState({ title: e.target.value, });
    };
  
    render() {
      return React.createElement(
        "form", 
        { onSubmit: this.handleSubmit, }, 
        React.createElement(
          "input",
          { 
            value: this.state.title, 
            name: "title",
            onChange: this.handleChange, 
            placeholder: "Add an item", 
          }
        ),
      );
    };
  };

  const TodoList = ({ list, handleComplete }) => {
    return React.createElement(
      "ul", 
      { key: "list", }, 
      list.map( item => {
        return React.createElement(
          Item, 
          {
            key: item.id,
            id: item.id,
            title: item.title,
            complete: item.complete,
            handleComplete: handleComplete,
          }
        );
      })
    );
  };

  const Item = ({ id, title, complete, handleComplete, }) => {
    return React.createElement(
      "li",
      { style: 
        { 
          textDecoration: complete && "line-through", 
          color: complete && "grey",
        }, 
        onClick: () => handleComplete(id)
      },
      title
    );
  };
  
  ReactDOM.render(
    React.createElement(App),
    document.getElementById("root")
  );