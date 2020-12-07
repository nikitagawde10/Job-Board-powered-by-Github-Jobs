
const jobs = "Amazon";
describe('second test', () => {
  it('should match', () => {
    expect(jobs).toBe("Amazon")
  })
})

describe('Initial Test', () => {
  it('should test that 2 - 2 === 0', () => {
    expect(2-2).toBe(0)
  })
})

// describe('A suite', function() {
//   it('should render without throwing an error', function() {
//     expect(shallow(<App />).contains(<div className="App"></div>)).toBe(true);
//   });

  // it('should be selectable by class "foo"', function() {
  //   expect(shallow(<App />).is('.foo')).toBe(true);
  // });

  // it('should mount in a full DOM', function() {
  //   expect(mount(<App />).find('.foo').length).toBe(1);
  // });

  // it('should render to static HTML', function() {
  //   expect(render(<App />).text()).toEqual('Bar');
  // });
// });
