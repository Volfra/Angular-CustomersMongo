import { OnInit } from '@angular/core';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Customer } from 'src/app/model/customer';
import { BankService } from 'src/app/services/bank.service';
import { AddComponent } from '../dialog/add/add.component';
import { DeleteComponent } from '../dialog/delete/delete.component';
import { EditComponent } from '../dialog/edit/edit.component';
import { MoreComponent } from '../dialog/more/more.component';
import { Query1Component } from '../dialog/query1/query1.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {

  displayedColumns: string[] = [
    'name',
    'age',
    'gender',
    'email',
    'balance',
    'actions',
  ];
  /*
  'isActive',
  'company',
  'phone',
  'address',
  'salary'];*/

  dataSource: MatTableDataSource<Customer>;
  public customers: Customer[];
  public customer_id: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private bankService: BankService, private dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.retrieveCustomers();
  }

  retrieveCustomers() {

    const input = document.getElementById('searchTxt') as HTMLInputElement | null;
    if (input != null)
      input.value = ''

    this.bankService.getAll().subscribe(
      (customers: Customer[]) => {
        this.customers = customers
        this.dataSource = new MatTableDataSource(customers);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = (data: Customer, filter: string) => {
          return data.name.includes(filter);
        };
      }
    );

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  moreCustomer(customer: Customer) {

    const dialogRef = this.dialog.open(MoreComponent, {
      width: '250px',
      data: {
        company: customer.company,
        address: customer.address,
        phone: customer.phone,
        salary: customer.salary,
        skills: customer.skills
      }
    });

  }

  editCustomer(customer: Customer) {

    const dialogRef = this.dialog.open(EditComponent, {
      width: '250px',
      data: {
        name: customer.name,
        age: customer.age,
        gender: customer.gender,
        email: customer.email,
        balance: customer.balance,
        company: customer.company,
        address: customer.address,
        phone: customer.phone,
        salary: customer.salary,
        skills: customer.skills,
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result === 1) {

        customer.name = dialogRef.componentInstance.data.name
        customer.age = dialogRef.componentInstance.data.age
        customer.gender = dialogRef.componentInstance.data.gender
        customer.email = dialogRef.componentInstance.data.email
        customer.balance = dialogRef.componentInstance.data.balance
        customer.company = dialogRef.componentInstance.data.company
        customer.address = dialogRef.componentInstance.data.address
        customer.phone = dialogRef.componentInstance.data.phone
        customer.salary = dialogRef.componentInstance.data.salary
        customer.skills = dialogRef.componentInstance.data.skills

        this.bankService.update(customer._id, customer).subscribe(
          (customer) => {
            console.log('Customer updated:', customer);
          })
      }

    });

  }


  deleteCustomer(customer: Customer) {

    this.customer_id = customer._id;
    const dialogRef = this.dialog.open(DeleteComponent, { data: { name: customer.name } });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        this.bankService.delete(customer._id).subscribe(
          (customer) => {
            this.retrieveCustomers();
            console.log('Customer deleted:', customer);
          })
      }
    });

  }


  addCustomer() {

    const dialogRef = this.dialog.open(AddComponent, {
      width: '250px',
      data: {
        name: '',
        age: '',
        gender: '',
        email: '',
        balance: '',
        company: '',
        address: '',
        phone: '',
        salary: '',
        skillJob: '',
        skillEducation: '',
        skillLanguages: '',
      }
    });

    var customer: Customer = new Customer();
    dialogRef.afterClosed().subscribe(result => {

      if (result === 1) {

        console.log(dialogRef.componentInstance.data)
        customer.name = dialogRef.componentInstance.data.name
        customer.age = dialogRef.componentInstance.data.age
        customer.gender = dialogRef.componentInstance.data.gender
        customer.email = dialogRef.componentInstance.data.email
        customer.balance = dialogRef.componentInstance.data.balance
        customer.company = dialogRef.componentInstance.data.company
        customer.address = dialogRef.componentInstance.data.address
        customer.phone = dialogRef.componentInstance.data.phone
        customer.salary = dialogRef.componentInstance.data.salary

        //Map skills
        customer.skills = new Map();
        customer.skills['job'] = dialogRef.componentInstance.data.skillJob;
        customer.skills['education'] = dialogRef.componentInstance.data.skillEducation;
        customer.skills['languages'] = dialogRef.componentInstance.data.skillLanguages;

        this.bankService.create(customer).subscribe(
          (customer) => {
            this.retrieveCustomers();
            console.log('Customer added:', customer);
          })
      }
    });
  }

  query1() {

    const dialogRef = this.dialog.open(Query1Component, {
      width: '250px',
      data: {
        minValue: 0,
        maxValue: 999999,
      }
    });

    const input = document.getElementById('searchTxt') as HTMLInputElement | null;
    if (input != null)
      input.value = ''
      
    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {

        this.bankService.query1(dialogRef.componentInstance.data.minValue, 
                                dialogRef.componentInstance.data.maxValue).subscribe(
          (customers: Customer[]) => {
            this.customers = customers
            this.dataSource = new MatTableDataSource(customers);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            this.dataSource.filterPredicate = (data: Customer, filter: string) => {
              return data.name.includes(filter);
            };
          }
        );
      }
    });

  }

}

