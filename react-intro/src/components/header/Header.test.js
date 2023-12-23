import renderer from 'react-test-renderer';
import Header from './Header';
import { MemoryRouter } from 'react-router-dom';

it('changes the class when hovered', () => {
  const component = renderer.create(
    <MemoryRouter><Header isMain={true} /></MemoryRouter>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});