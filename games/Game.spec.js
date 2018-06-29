const mongoose = require('mongoose');



describe('The Game Model', () => {
  beforeAll(() => {
    return mongoose
      .connect('mongodb://localhost/test')
      .then(() => console.log('\n=== connected to TEST DB ==='))
      .catch(err => {
        console.log('error connecting to TEST database, is MongoDB running?');
      });
  } );
  
  

  afterAll(() => {
    return mongoose
      .disconnect()
      .then( () => console.log( '\n=== disconnected from TEST DB ===' ) );
    
  } );
  
  beforeEach( () =>
  {
  
})
  it('runs the tests', () => {});

  // test away!
});
