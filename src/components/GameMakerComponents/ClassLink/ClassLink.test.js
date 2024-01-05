import renderer from 'react-test-renderer';
import ClassLink from './ClassLink.jsx';
import { useDispatch, useSelector, Provider } from 'react-redux';

import { createStore } from 'redux';
import rootReducer from '../../../redux/reducers/_root.reducer.js'; // Import your reducers

const store = createStore(rootReducer);

it('has the correct text on the class link', () => {

    let newClass = {class_name: 'test', id: 1}


    const component = renderer.create(
        <Provider thisClass={newClass}>
            <ClassLink thisClass={newClass}></ClassLink>,
        </Provider>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  
    // manually trigger the callback

    // renderer.act(() => {
    //   tree.props.onMouseEnter();
    // });

    // re-rendering

    // tree = component.toJSON();
    // expect(tree).toMatchSnapshot();
  
    // manually trigger the callback

    // renderer.act(() => {
    //   tree.props.onMouseLeave();
    // });

    // re-rendering

    // tree = component.toJSON();
    // expect(tree).toMatchSnapshot();
  });