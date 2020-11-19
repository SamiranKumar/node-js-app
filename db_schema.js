Use employeedb;

CREATE TABLE IF NOT EXISTS`employee`(
    id INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    emp_name varchar(250) NOT NULL,
    emp_code varchar(40) DEFAULT NULL,
    salary varchar(250) DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
)
CHARACTER SET 'utf8' COLLATE 'utf8_icelandic_ci';





//=================================================================================================================
CREATE PROCEDURE `Employee_ADD_OR_EDIT` (
    IN _id INT,
    IN _emp_name varchar(250),
    IN _emp_code varchar(40),
    IN _salary varchar(250)
    )
    #=====================================================
    
    BEGIN
        IF _id = 0 THEN
            INSERT INTO employee(emp_name,emp_code,salary)
            VALUES(_emp_name,_emp_code,_salary);
        
            SET _id = last_insert_id();
            
        ELSE
            UPDATE employee
                SET
                emp_name =_emp_name,
                emp_code =_emp_code,
                salary =_salary
                WHERE id = _id;
            END IF;
            
            SELECT _id AS 'id';
    
    END
