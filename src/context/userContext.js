import { createContext, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import firstTrouser from '../productsassets/download (1).jpeg';
import firstShirt from '../productsassets/download (2).jpeg';
import firstWristWatch from '../productsassets/download.webp';
import firstShoes from '../productsassets/download (3).jpeg';
import firstElectronics from '../productsassets/download (4).jpeg';

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [carts, setToCart] = useState([]);
  const navigate = useNavigate();
  const baseUrl = "http://localhost:5000/users";
  
  const [products] = useState([
    { id: 1, 
      imgSrc: firstTrouser, 
      category: 'trouser', 
      price: 20 
    },
    { id: 2, 
      imgSrc: firstShirt, 
      category: 'shirt', 
      price: 34 
    },
    { id: 3, 
      imgSrc: firstWristWatch, 
      category: 'wristwatch', 
      price: 45 
    },
    { id: 4, 
      imgSrc: firstShoes, 
      category: 'shoe', 
      price: 56 
    },
    { id: 5, 
      imgSrc: firstElectronics, 
      category: 'electronic', 
      price: 100 
    },
  ]);

  function loginUser(name, password) {
    fetch(baseUrl)
      .then((res) => res.json())
      .then((users) => {
        const user = users.find((user) => user.name === name && user.password === password);
        if (user) {
          setUser(user);
          toast.success(`Welcome ${user.name}!`, { toastId: "2" }, { duration: "1000" });
          navigate('/');
        } else {
          toast.error("Invalid credentials!", { toastId: "3" }, { duration: "1000" });
        }
      });
  }

  const addToCart = (product) => {
    setToCart((prevCarts) => {
      // Check if the product already exists in the cart
      const existingProduct = prevCarts.find((item) => item.id === product.id);
      
      if (existingProduct) {
        // Update the quantity of the existing product
        return prevCarts.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item );
      } else {
        // Add the new product to the cart with a quantity of 1
        return [...prevCarts, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        carts,
        products,
        loginUser,
        setUser,
        setToCart,
        addToCart,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
