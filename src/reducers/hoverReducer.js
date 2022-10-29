import { ON_HOVER } from '../actions/types';

const initialState = {
  hover : false,
};

const onHoverReducer = (state = initialState, action) => {
  switch (action.type) {
    case ON_HOVER:
      return { hover: !state.hover };
    default:
      return state;
  }
};

export default onHoverReducer;
