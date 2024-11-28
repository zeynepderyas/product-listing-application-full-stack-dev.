# product-listing-application-full-stack-dev.
A full-stack product listing app with a Flask backend and a responsive HTML/CSS/JavaScript frontend. Features dynamic price calculation using real-time gold prices, interactive product display with a color picker, filtering, and a carousel. Mobile-friendly and ready for deployment.




This is a simple yet comprehensive product listing application that showcases how backend and frontend technologies work together. It features a dynamic and user-friendly interface that pulls product data from a backend API and presents it in an engaging way. Key functionalities include real-time price calculations, product filtering, and interactive elements like a color picker and carousel navigation.

The backend is built with Flask, offering a RESTful API to serve product data stored in a JSON file. Product prices are calculated dynamically based on their weight, popularity score, and the current gold price, which is fetched from a real-time API. Flask-CORS ensures smooth communication between the backend and frontend.

The frontend is built with lightweight HTML, CSS, and JavaScript, focusing on performance and responsiveness. It provides a seamless experience across devices, whether on mobile or desktop. Users can browse a product list, filter items by price, color, or rating, and switch product images by selecting different colors. The carousel adds an extra touch, allowing users to scroll through the list with ease using arrows or swipes.

Highlights:
Dynamic price calculation using real-time gold rates.
A clean 5-star rating system, including half-star support.
Responsive, visually appealing design that closely matches the provided template.
Advanced filtering options for enhanced product discovery.
This project demonstrates full-stack development skills, combining a dynamic backend with an interactive frontend. It also reflects best practices like error handling, modular code, and responsive design.

Looking ahead, this application is a great foundation for further improvements, such as adding user authentication, detailed product pages, or integrating additional APIs to extend its functionality. It’s designed to be scalable, easy to maintain, and a solid example of modern web development.

Note:
While running the project, make sure that the file structure is as follows
--Kutez--
-Backend-
App.py
Product.json
requirements.txt

-Frontend-
*src*
app.js
index.css
fonts
*public*
index.html

Note: Use these commands to run the project via vs code 
first open the app.py terminal than,
cd Backend
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate     # Windows
pip install -r requirements.txt
flask run
cd Frontend
then go to index.html and open with live server.

Note: You can see the extracted products by pasting this link into the search engine, it shows that the backend is working correctly.
http://127.0.0.1:5000/products



