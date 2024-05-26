This project involves creating a contact management application using modern web development technologies. 
The app will feature functionalities to manage contacts and display COVID-19 data using charts and maps. 
The project will utilize the following technologies:

  ReactJS: A popular JavaScript library for building user interfaces.
  TypeScript: A typed superset of JavaScript that compiles to plain JavaScript.
  TailwindCSS: A utility-first CSS framework for rapid UI development.
  React Router v6: A library for routing in React applications.
  React Query (Tanstack Query): A data-fetching library for React applications.
  Redux: A state management library for JavaScript applications.


Features
  Contacts Page:

    Form for Adding New Contacts:
      A form to input contact details such as first name, last name, phone, email, and status (active/inactive).
      All fields are required, and appropriate error messages are displayed if any field is left empty.
      The "Create Contact" button disappears while the form is being filled out.

    Display List of Added Contacts:
      A list view that displays all added contacts.
      Each contact displays as a card with basic details visible.

    Alerts for successful contact creation, editing, and deletion.
      The "No Contact Found. Please add a contact from the Create Contact button." message disappears once a contact is added.

    Edit and Delete Contacts:
      Edit and delete buttons for each contact.
      Editing is done inline within the same card.
      Deleting removes the contact from the list.

    State Management:
      Redux is used to store and manage contact data across the application.

Charts and Maps Page:

    Line Graph for Cases Fluctuations:
      A line graph that shows the fluctuation of COVID-19 cases over time.
      Uses react-chartjs-2 and chart.js for rendering the graph.

    Map with COVID-19 Data:
      A map using react-leaflet to display markers for different countries.
      Each marker shows a popup with the country's name, total active cases, recovered cases, and deaths.
