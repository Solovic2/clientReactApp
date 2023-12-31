import React, { useEffect, useRef, useState } from "react";
import "./FilterCards.css";
import AudioPlayer from "../Audio/AudioPlayer";
function FilterCards({ user, data, setFilterData, setValues, notify }) {
  const infoContainerRef = useRef(null);
  const [playingCard, setPlayingCard] = useState(null);
  const [showForm, setShowForm] = useState({});
  const [cardClass, setCardClass] = useState('card')
  
  useEffect(() => {
    if (user) {
      setCardClass(user.role === "Admin" ? "card card-admin" : user.role === "Manager" ? "card card-manager" : user.role === "User" ? "card card-user" : "card");
    } else {
      setCardClass('card')
    }

  }, [user])


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
    fetch(`http://localhost:9000/file/${path}`, { credentials: 'include', })
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
  const handleDelete = async (path) => {
    try {
      const response = await fetch(
        `http://localhost:9000/delete-complain/${encodeURI(path)}`,
        {
          method: "POST",
          credentials: 'include',
        }
      );
      if (!response.ok) {
        throw new Error("Failed to hide card");
      }
      setFilterData((prevValues) => prevValues.filter(card => card.path !== path));
      notify(2, prev=>prev - 1);
      // Remove the deleted card from the state
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };
  // Handle When Submit
  const handleSubmit = async (event, path) => {
    event.preventDefault(); // prevent default form submission behavior
    const inputValue = event.target.elements.infoInput.value;
    if (inputValue !== "") {
      // do something with the input value, like submit it to a server
      // Update
      try {
        const response = await fetch(
          `http://localhost:9000/update-complain/${encodeURI(path)}`,
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
        setValues((prevData) => {
          const updatedData = prevData.map((card) => {
            if (card.path === path) {
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
        [path]: false,
      }));
    }
  };
  // Handle Edit Reply Submit
  const handleEdit = (path) => {
    setShowForm((prevShowForm) => ({
      ...prevShowForm,
      [path]: !prevShowForm[path],
    }));
  };

  return (
    <div className="card-container hide-scrollbar">
      {data?.map((element, index) => {
        let audioElement = null;
        let fullPath = element.path.split("\\");
        const path = fullPath[fullPath.length - 1]
        if (element.fileType === "wav") {
          audioElement = (
            <div className="audio">
              <label className="audio-float"> :سماع الشكوى</label>
              <AudioPlayer src={`http://localhost:9000/audio/${path}`} playingCard={playingCard} setPlayingCard={setPlayingCard}  />
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
          <div key={index} id="card" className={cardClass} >
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
            {user && (user.role === "Admin") && (
              <div className="deleteBtn">
                <button
                  className="btn"
                  onClick={() => handleDelete(element.path)}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            )}

            {user && (user.role === "Admin" || user.role === "Manager") && (
              <>
                {
                element.info !== null && element.info !== "" && (
                  <div className="reply-and-edit">
                    <div className="scrollable-container" ref={infoContainerRef}>
                      <label>الرد :</label>
                      <div className="scrollable-content">{element.info}</div>
                    </div>
                  </div>
                )}
                {element.info !== null && element.info !== "" && (
                  <div className="edit-button">
                    <button onClick={() => handleEdit(element.path)}>
                      {showForm[element.path] ? "Cancel" : "Edit"}
                    </button>
                  </div>
                )}
                {(element.info === null ||
                  element.info === "" ||
                  showForm[element.path]) && (
                    <div className="form-submit">
                      <form
                        onSubmit={(event) => handleSubmit(event, element.path)}
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
                          {showForm[element.path] ? "تعديل" : "إضافة رد"}
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
