// TODO: Write code to define and export the Employee class

class Employee {
    constructor(name, id, email) {

        // guess modding the id in another module...s

        this.name = name;
        this.id = id;
        this.email = email;

        // ^^^ modifying the contents of the proto method!

    }

    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    getRole() {
return "Employee";
    }
    // Returns 'Employee'


}

module.exports = Employee;
