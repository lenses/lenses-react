module.exports = {

  loadTestData: function (){
    this.setState({
      data:[['Goats', 5], ['Burrito',3], ['Olives', 1], ['Zucchini', 1], ['Pepperoni',2]],
      columns: [['string', 'Topping'] , ['number' , 'Slices']]
    });
  }
}
