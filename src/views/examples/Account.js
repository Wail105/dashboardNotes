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
import { FaEdit, FaPlus } from "react-icons/fa"; // Import FaPlus for the + icon

const Account = () => {
  const [searchQuery, setSearchQuery] = useState("");
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
    { id: 1, firstName: "wail", lastName: "ihab", cin: "A343456", email: "wail@bessi.com", phone: "1234567890", status: "active" },
    { id: 2, firstName: "haitam", lastName: "bessi", cin: "B654421", email: "bessi@wail.com", phone: "0987654321", status: "disabled" },
  ];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPersons = persons.filter(
    (person) =>
      person.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.cin.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const handleCreateUser = () => {
    const login = `${selectedPerson.firstName}${selectedPerson.lastName}`.toLowerCase();
    const password = generatePassword();
    setNewUser({ ...newUser, login, password });
    alert(`User created with login: ${login} and password: ${password}`);
    setShowUserForm(false);
  };

  const handleCreatePerson = () => {
    alert(`Person created: ${newPerson.firstName} ${newPerson.lastName}`);
    setShowPersonForm(false);
  };

  const handleResetPassword = () => {
    const newPassword = generatePassword();
    alert(`Password reset to: ${newPassword}`);
  };

  const handleToggleAccountStatus = (person) => {
    const newStatus = person.status === "active" ? "disabled" : "active";
    alert(`Account status changed to: ${newStatus}`);
    // Update the account status in the database
  };

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        {/* Table Section */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0 d-flex justify-content-between align-items-center">
                <h3 className="mb-0">Users List</h3>
                <div className="d-flex align-items-center">
                  <Input
                    type="text"
                    placeholder="Search by Name or CIN"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="mr-2"
                    style={{ width: "auto" }}
                  />
                  <Button color="primary" onClick={() => setShowPersonForm(true)}>
                    <FaPlus /> {/* Plus icon */}
                  </Button>
                </div>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">CIN</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Status</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPersons.map((person) => (
                    <tr key={person.id}>
                      <td>{`${person.firstName} ${person.lastName}`}</td>
                      <td>{person.cin}</td>
                      <td>{person.email}</td>
                      <td>{person.phone}</td>
                      <td>
                        <Badge color={person.status === "active" ? "success" : "danger"}>
                          {person.status}
                        </Badge>
                      </td>
                      <td>
                        <Button color="success" onClick={() => handleSelectPerson(person)}>
                          Create Account
                        </Button>
                        <Button color="info" onClick={() => handleEditPerson(person)} className="ml-2">
                          <FaEdit />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>

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
              Create account
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
              <Button
                color="danger"
                onClick={() => handleToggleAccountStatus(selectedUser)}
                className="ml-2"
              >
                {selectedUser?.status === "active" ? "Disable Account" : "Enable Account"}
              </Button>
            </Form>
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
          <ModalHeader toggle={() => setShowPersonForm(false)}>Create New User</ModalHeader>
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
              Create user
            </Button>
            <Button color="secondary" onClick={() => setShowPersonForm(false)}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    </>
  );
};

export default Account;