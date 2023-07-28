import React, { useEffect, useState } from 'react'
import "./Table.css"
import { useNavigate } from 'react-router'
const Table = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])
    const user = sessionStorage.getItem('storedUser') ? JSON.parse(sessionStorage.getItem('storedUser')) : sessionStorage.getItem('storedUser');

   useEffect(() => {
    if (!user || user.data.role !== "Admin") {
        // Redirect to login page if user data is not available
        navigate("/");
        return;
    }
   
   }, [user,navigate])
   

    useEffect(() => {
       
        fetch("http://localhost:9000/admin/users", {
            credentials: 'include'
        }).then(response => {
                if (response.ok) {
                    // The response status is in the 2xx range, so the request was successful
                    return response.json();
                }
            })
            .then(data => setUsers(data))
            .catch(error => {
                // Display the error message
                console.error(error.message);
            })
    }, [navigate])

    const handleEdit = (userID) => {
        navigate(`/control-panel-admin/edit/${userID}`, {
            state: { user: user.user }
        })
    }

    
    const handleDelete = async (id) => {
        try {
            const response = await fetch(
              "http://localhost:9000/admin-delete/"+id,
              {
                method: "DELETE",
                credentials: 'include',
              }
            );
            if (!response.ok) {
              throw new Error("Failed to delete card");
            }else{
                const updatedUsers = users.filter((user) => user.id !== id);
                setUsers(updatedUsers);
            }
      
        
            // Remove the deleted card from the state
          } catch (error) {
            console.error("Error deleting card:", error);
          }
    }
    

    if (!user|| user.data.role !== "Admin") {
        return null;
    }
    return (
        <>

            <div className='contolePanel'>

                <table className="table table-striped table-bordered" >
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">اسم المستخدم</th>
                            <th scope="col">دور المستخدم</th>
                            <th scope="col">العمليات</th>
                        </tr>
                    </thead>

                    <tbody >

                        {users?.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <th>{user.id}</th>
                                    <th>{user.username}</th>
                                    <th>{user.role}</th>
                                    <th>
                                        <div>
                                            <button type="button" className="btn btn-success" onClick={() => handleEdit(user.id)}>تعديل المستخدم</button>
                                            <button type="button" className="btn btn-danger" onClick={() => handleDelete(user.id)}>مسح المستخدم</button>
                                        </div>
                                    </th>
                                </tr>

                            )
                        })}
                    </tbody>


                </table>
            </div >


        </>
    )
}

export default Table