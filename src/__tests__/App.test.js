
import shallow, { mount } from 'enzyme'
import App from '../App'

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

describe('App', () => {
  it('renders correctly', ()=> {
    const wrapper = shallow(<App/>);
    expect(wrapper).toMatchSnapshot();
  })

  it('checks for span and ul presence', ()=> {
    const wrapper = shallow(<App/>);
    expect(wrapper.find('span')).toExist();
    expect(wrapper.find('ul')).not.toExist();
  })

  it('checks for div IDs', ()=> {
  const wrapper = shallow(<App/>);
  expect(wrapper.find('.JobField')).toHaveDisplayName('class');
  expect(wrapper.find('#TCE')).not.toHaveDisplayName('div');
  })

  it('checks if a state is present', ()=> {
    const wrapper = mount(<App/>);
    expect(wrapper).toHaveState('allData');
    })
})
