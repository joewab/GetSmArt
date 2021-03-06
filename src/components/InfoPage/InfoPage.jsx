import React from 'react';
import Nav from '../Nav/Nav';



function InfoPage() {
  return (
    <>
    <Nav/>
    <div className="container">
      <p>Info Page</p>

      <h3>Instructions:</h3>
      <h4>log in as a teacher: username: mrjoe, password: 321</h4>
      <h4>log in as a student: username: joe, password: 123</h4>



      <h3>Technologies used to build this app:</h3>
      <ul>
        <li>JavaScript</li>
        <li>Material-UI</li>
        <li>React</li>
        <li>Redux</li>
        <li>Sagas</li>
        <li>Node</li>
        <li>Express</li>
        <li>PostgreSQL</li>
      </ul>

      <h3>Where do I go from here?</h3>
      <ul>
        <li>Use an API to autocomplete forms when making galleries</li>
        <li>Use fuzzy matching so that the students don't have to spell everything perfectly.</li>
        <li>Give teachers the ability to add classes and edit the student list for each class.</li>
        <li>Give teachers the ability to assign galleries to specific classes.</li>
        <li>Add more feedback for students playing the game, make it more exciting!</li>
      </ul>

      <h3>Thank You!</h3>
      <ul>
        <li>Prime Digital Academy</li>
        <li>Our instructor, Matt</li>
        <li>My friends and family</li>
        <li>The Dahl cohort WAY TO GO!!!!!</li>
      </ul>
    </div>
    </>
  );
}

export default InfoPage;
