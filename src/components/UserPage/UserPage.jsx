//react, redux, sagas-------------------------------------------------
import React, { useEffect }  from 'react';
import {useSelector, useDispatch} from 'react-redux';

// components--------------------------------------------------------
import AllGamesPage from '../GamePlayerComponents/AllGamesPage/AllGamesPage';
import ClassesForm from '../GameMakerComponents/ClassesForm/ClassesForm';

function UserPage() {
  useEffect(() => {
    dispatch({ 
      type: 'FETCH_GALLERIES',
      //TBD this should eventually be removed since both user types will land on a classes page
      payload: {className: 'Art 101', classId: '1'}
   });
    dispatch({ type: 'FETCH_SCORES' });
  }, []);
  
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  if(user.admin===true){
    return(
      <ClassesForm/>
    )
  } else {
      return (
        <>
          <AllGamesPage/>
        </>
      );
  }
}
export default UserPage;
