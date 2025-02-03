/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
    Container,
    Row,
    UncontrolledTooltip,
    Button,
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    CardBody,
  } from "reactstrap";
  import Header from "components/Headers/Header.js";
  import { useState } from "react";
  import { FaEdit } from "react-icons/fa"; 
  
  const Account = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showUserForm, setShowUserForm] = useState(false);
    const [showPersonForm, setShowPersonForm] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [newUser, setNewUser] = useState({
      role: "",
      login: "",
      password: "",
    });
    const [newPerson, setNewPerson] = useState({
      firstName: "",
      lastName: "",
      cin: "",
      email: "",
      phone: "",
    });
  
    // Dummy data for demonstration
    const persons = [
      { id: 1, firstName: "John", lastName: "Doe", cin: "A123456", email: "john.doe@example.com", phone: "1234567890" },
      { id: 2, firstName: "Jane", lastName: "Smith", cin: "B654321", email: "jane.smith@example.com", phone: "0987654321" },
    ];
  
    // Dummy data for activity and login history
    const activityHistory = [
      { id: 1, action: "Visited Dashboard", timestamp: "2024-01-01 10:00 AM" },
      { id: 2, action: "Updated Profile", timestamp: "2024-01-01 11:00 AM" },
    ];
  
    const loginHistory = [
      { id: 1, ip: "192.168.1.1", timestamp: "2024-01-01 10:00 AM" },
      { id: 2, ip: "192.168.1.2", timestamp: "2024-01-01 11:00 AM" },
    ];
  
    const handleSearch = () => {
      const results = persons.filter(
        (person) =>
          person.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          person.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          person.cin.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    };
  
    const handleSelectPerson = (person) => {
      setSelectedPerson(person);
      setShowUserForm(true);
    };
  
    const handleEditPerson = (person) => {
      setSelectedUser(person); 
      setShowEditModal(true); 
    };
  
    const generatePassword = () => {
      const length = 10;
      const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      let password = "";
      for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
      }
      return password;
    };
  
    // Handle user creation
    const handleCreateUser = () => {
      const login = `${selectedPerson.firstName}${selectedPerson.lastName}`.toLowerCase();
      const password = generatePassword();
      setNewUser({ ...newUser, login, password });
      alert(`User created with login: ${login} and password: ${password}`);
      setShowUserForm(false);
    };
  
    const handleCreatePerson = () => {
      // Save the new person to the database
      alert(`Person created: ${newPerson.firstName} ${newPerson.lastName}`);
      setShowPersonForm(false);
    };
  
    const handleResetPassword = () => {
      const newPassword = generatePassword();
      alert(`Password reset to: ${newPassword}`);
      // Save the new password to the database (waiting for bessi)
    };
  
    const handleToggleAccountStatus = () => {
      const newStatus = selectedUser.status === "active" ? "disabled" : "active";
      alert(`Account status changed to: ${newStatus}`);
      // Update the account status in the database (waiting for bessi)
    };
  
    return (
      <>
        <Header />
        <Container className="mt--7" fluid>
          {/* Search Section */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Search for a Person</h3>
                </CardHeader>
                <CardBody>
                  <Form>
                    <FormGroup>
                      <Input
                        type="text"
                        placeholder="Search by Name or CIN"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </FormGroup>
                    <Button color="primary" onClick={handleSearch}>
                      Search
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </div>
          </Row>
  
          {/* Search Results */}
          {searchResults.length > 0 && (
            <Row className="mt-4">
              <div className="col">
                <Card className="shadow">
                  <CardHeader className="border-0">
                    <h3 className="mb-0">Search Results</h3>
                  </CardHeader>
                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">CIN</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchResults.map((person) => (
                        <tr key={person.id}>
                          <td>{`${person.firstName} ${person.lastName}`}</td>
                          <td>{person.cin}</td>
                          <td>{person.email}</td>
                          <td>{person.phone}</td>
                          <td>
                            <Button color="success" onClick={() => handleSelectPerson(person)}>
                              Create Account
                            </Button>
                            <Button color="info" onClick={() => handleEditPerson(person)} className="ml-2">
                              <FaEdit /> {/* Edit icon */}
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card>
              </div>
            </Row>
          )}
  
          {/* User Creation Modal */}
          <Modal isOpen={showUserForm} toggle={() => setShowUserForm(false)}>
            <ModalHeader toggle={() => setShowUserForm(false)}>Create User Account</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label>Role</Label>
                  <Input
                    type="select"
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  >
                    <option value="">Select Role</option>
                    <option value="ADMIN_SP">ADMIN_SP</option>
                    <option value="ADMIN_NOTES">ADMIN_NOTES</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label>Generated Login</Label>
                  <Input type="text" value={newUser.login} readOnly />
                </FormGroup>
                <FormGroup>
                  <Label>Generated Password</Label>
                  <Input type="text" value={newUser.password} readOnly />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={handleCreateUser}>
                Create User
              </Button>
              <Button color="secondary" onClick={() => setShowUserForm(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
  
          {/* Edit User Modal */}
          <Modal isOpen={showEditModal} toggle={() => setShowEditModal(false)}>
            <ModalHeader toggle={() => setShowEditModal(false)}>Edit User Account</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label>Role</Label>
                  <Input
                    type="select"
                    value={selectedUser?.role || ""}
                    onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                  >
                    <option value="ADMIN_SP">ADMIN_SP</option>
                    <option value="ADMIN_NOTES">ADMIN_NOTES</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label>Account Status</Label>
                  <Input
                    type="select"
                    value={selectedUser?.status || "active"}
                    onChange={(e) => setSelectedUser({ ...selectedUser, status: e.target.value })}
                  >
                    <option value="active">Active</option>
                    <option value="disabled">Disabled</option>
                  </Input>
                </FormGroup>
                <Button color="warning" onClick={handleResetPassword}>
                  Reset Password
                </Button>
                <Button color="danger" onClick={handleToggleAccountStatus} className="ml-2">
                  {selectedUser?.status === "active" ? "Disable Account" : "Enable Account"}
                </Button>
              </Form>
  
              {/* Activity History */}
              <h5 className="mt-4">Activity History</h5>
              <Table>
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {activityHistory.map((activity) => (
                    <tr key={activity.id}>
                      <td>{activity.action}</td>
                      <td>{activity.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
  
              {/* Login History */}
              <h5 className="mt-4">Login History</h5>
              <Table>
                <thead>
                  <tr>
                    <th>IP Address</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {loginHistory.map((login) => (
                    <tr key={login.id}>
                      <td>{login.ip}</td>
                      <td>{login.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => setShowEditModal(false)}>
                Save Changes
              </Button>
              <Button color="secondary" onClick={() => setShowEditModal(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
  
          {/* Person Creation Modal */}
          <Modal isOpen={showPersonForm} toggle={() => setShowPersonForm(false)}>
            <ModalHeader toggle={() => setShowPersonForm(false)}>Create New Person</ModalHeader>
            <ModalBody>
              <Form>
                <FormGroup>
                  <Label>First Name</Label>
                  <Input
                    type="text"
                    value={newPerson.firstName}
                    onChange={(e) => setNewPerson({ ...newPerson, firstName: e.target.value })}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Last Name</Label>
                  <Input
                    type="text"
                    value={newPerson.lastName}
                    onChange={(e) => setNewPerson({ ...newPerson, lastName: e.target.value })}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>CIN</Label>
                  <Input
                    type="text"
                    value={newPerson.cin}
                    onChange={(e) => setNewPerson({ ...newPerson, cin: e.target.value })}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={newPerson.email}
                    onChange={(e) => setNewPerson({ ...newPerson, email: e.target.value })}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Phone</Label>
                  <Input
                    type="text"
                    value={newPerson.phone}
                    onChange={(e) => setNewPerson({ ...newPerson, phone: e.target.value })}
                  />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={handleCreatePerson}>
                Create Person
              </Button>
              <Button color="secondary" onClick={() => setShowPersonForm(false)}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
  
          {/* Add a button to create a new person if not found */}
          {searchResults.length === 0 && (
            <Row className="mt-4">
              <div className="col">
                <Button color="info" onClick={() => setShowPersonForm(true)}>
                  Create New Person
                </Button>
              </div>
            </Row>
          )}
        </Container>
      </>
    );
  };
  
  export default Account;