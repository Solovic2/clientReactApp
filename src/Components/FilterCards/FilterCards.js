import React, { useEffect, useRef, useState } from "react";
import "./FilterCards.css";
import { useCookies } from 'react-cookie';
function FilterCards(props) {
  const cardContainerRef = useRef(null);
  const infoContainerRef = useRef(null);
  const [showForm, setShowForm] = useState({});
  const [cardClass, setCardClass] = useState('card')
  const [cardContainerClass, setCardContainerClass] = useState('card-container hide-scrollbar')
  const [{user}] = useCookies(['user']);
  useEffect(() => {
    if(user){
      setCardClass(user.data.role === "Admin" ? "card card-admin" :  user.data.role === "Manager" ? "card card-manager" : user.data.role === "User" ? "card card-user"  : "card");
      setCardContainerClass(user.data.role === "Admin" ? "card-container hide-scrollbar" :  user.data.role === "Manager" ? "card-container hide-scrollbar card-container-manager" : user.data.role === "User" ? "card-container hide-scrollbar card-container-user"  : "card-container hide-scrollbar")
    }else{
      setCardClass('card')
      setCardContainerClass('card-container hide-scrollbar')
    }
  
  }, [user])
  
 

  
  // Show ScrollBar When There Are Elements Fit The Height Of The ScrollBar Or Hide It When No Element Fit The Height
  useEffect(() => {
    const cardContainer = cardContainerRef.current;
    function toggleScrollbar() {
      if (cardContainer.scrollHeight > cardContainer.clientHeight) {
        cardContainer.classList.remove("hide-scrollbar");
      } else {
        cardContainer.classList.add("hide-scrollbar");
      }
    }
    window.addEventListener("resize", toggleScrollbar);
    toggleScrollbar();
    return () => {
      window.removeEventListener("resize", toggleScrollbar);
    };
  }, []);
  // Show ScrollBar When There Are Elements Fit The Width Of The ScrollBar Or Hide It When No Element Fit The Width
  useEffect(() => {
    const infoContainer = infoContainerRef.current;
    if (!infoContainer) {
      return;
    }
    function toggleScrollbar() {
      if (infoContainer.scrollWidth > infoContainer.clientWidth) {
        infoContainer.classList.remove("show-scrollbar");
      } else {
        infoContainer.classList.add("show-scrollbar");
      }
    }
    window.addEventListener("resize", toggleScrollbar);
    toggleScrollbar();
    return () => {
      window.removeEventListener("resize", toggleScrollbar);
    };
  }, []);

  // Show Shakwa When Press The Button
  const handleClick = async (path) => {
    fetch(`http://128.36.1.71:9000/file/${path}`, {credentials: 'include',})
      .then((response) => response.text())
      .then((fileContents) => {
        // Create popup window
        const popupWindow = window.open(
          "read-text-file",
          "read-text-file",
          "width=600,height=400,resizable=no,scrollbars=yes"
        );
        popupWindow.document.write(`<pre>${fileContents}</pre>`);
      });
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://128.36.1.71:9000/delete-complain/${id}`,
        {
          method: "DELETE",
          credentials: 'include',
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete card");
      }

      props.setValuesData((prevData) =>
        prevData.filter((card) => card.id !== id)
      );

      console.log(props.data)
      // Remove the deleted card from the state
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };
  // Handle When Submit
  const handleSubmit = async (event, id) => {
    event.preventDefault(); // prevent default form submission behavior
    const inputValue = event.target.elements.infoInput.value;
    if (inputValue !== "") {
      console.log("Form submitted with value:", inputValue);
      // do something with the input value, like submit it to a server
      // Update
      try {
        console.log(inputValue);
        const response = await fetch(
          `http://128.36.1.71:9000/update-complain/${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({ info: inputValue }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete card");
        }
        props.setValuesData((prevData) => {
          const updatedData = prevData.map((card) => {
            if (card.id === id) {
              return { ...card, info: inputValue };
            }
            return card;
          });
          return updatedData;
        });
      } catch (error) {
        console.error("Error deleting card:", error);
      }
      setShowForm((prevShowForm) => ({
        ...prevShowForm,
        [id]: false,
      }));
    }
  };
  // Handle Edit Reply Submit
  const handleEdit = (id) => {
    setShowForm((prevShowForm) => ({
      ...prevShowForm,
      [id]: !prevShowForm[id],
    }));
  };

  return (
    <div className={cardContainerClass} ref={cardContainerRef}>
      {props.data?.map((element, index) => {
        let audioElement = null;
        let fullPath = element.path.split("\\");
        const path = fullPath[fullPath.length - 1]
        if (element.fileType === "wav") {
          audioElement = (
            <div className="audio">
              <label className="audio-float"> :سماع الشكوى</label>
              <audio controls src={`http://128.36.1.71:9000/audio/${path}`} />
            </div>
          );
        } else {
          audioElement = (
            <div className="button"> 
              <button
                className="btn btn-primary"
                onClick={() => handleClick(path)}
              >
                قراءة الشكوى
              </button>
            </div>
          );
        }


        return (
          <div key={element.id} className={cardClass}>
            <div className="mobile">
              <label className="card-label">
                {element.mobile || "UnKnown"}
                <span className="card-info"> :رقم الهاتف</span>
              </label>
            </div>
            <div className="file-date">
              <label className="card-label">
              {element.fileDate}
              <span className="card-info"> :تاريخ الشكوى</span>
            </label>
            </div>
            <div className="audio-element">{audioElement}</div>
             { user && (user.data.role === "Admin") && ( 
               <div className="deleteBtn">
               <button
                 className="btn btn-danger"
                 onClick={() => handleDelete(element.id)}
               >
                 <i className="fa-solid fa-trash"></i>
               </button>
             </div>
            )} 
           
           { user && (user.data.role === "Admin" || user.data.role === "Manager") && (
            <>
              {element.info !== null && element.info !== "" && (
                  <div className="reply-and-edit">
                    <div className="scrollable-container" ref={infoContainerRef}>
                      <label>الرد :</label>
                      <div className="scrollable-content">{element.info}</div>
                    </div>
                  </div>
              )}
              {element.info !== null && element.info !== "" && (
                <div className="edit-button">
                  <button onClick={() => handleEdit(element.id)}>
                    {showForm[element.id] ? "Cancel" : "Edit"}
                  </button>
                </div>
              )}
              {(element.info === null ||
                element.info === "" ||
                showForm[element.id]) && (
                <div className="form-submit">
                  <form
                    onSubmit={(event) => handleSubmit(event, element.id)}
                    className="d-flex justify-content-between w-100"
                  >
                    <input
                      type="text"
                      name="infoInput"
                      className="my-input mr-2"
                      placeholder="الرد"
                      defaultValue={element.info}
                    />
                    <button type="submit" className="btn btn-sm btn-success">
                      {showForm[element.id] ? "تعديل" : "إضافة رد"}
                    </button>
                  </form>
                </div>
              )}
            </>
            )} 
          </div>
        );
      })}
    </div>
  );
}

export default FilterCards;
