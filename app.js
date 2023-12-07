//Class Doctor
class Doctor {
  constructor(name, age, qualification, experience, docId) {
    this.name = name;
    this.age = age;
    this.qualification = qualification;
    this.experience = experience;
    this.docId = Store.getDid(+1);
  }
}

//Class Patient
class Patient {
  constructor(name, age, disease, gender, patId) {
    this.name = name;
    this.age = age;
    this.disease = disease;
    this.gender = gender;
    this.patId = Store.getPid(1);
  }
}

//UI Class
class UI{
  static changeTab(from, to){
    const docTabContent = document.getElementById('doc-tab-content');
    const patTabContent = document.getElementById('pat-tab-content');
    const docTab = document.getElementById('doc-tab');
    const patTab = document.getElementById('pat-tab');

    if(from === 'pat' && to==='doc'){
      patTabContent.className ='tab-pane fade active show';
      patTab.className = 'nav-link active'
      docTabContent.classList.remove('active');
      docTabContent.classList.remove('show');
      docTab.className = 'nav-link';
    }
    else if (from === 'doc' && to==='pat') {
      docTabContent.className ='tab-pane fade active show';
      docTab.className = 'nav-link active'
      patTabContent.classList.remove('active');
      patTabContent.classList.remove('show');
      patTab.className = 'nav-link';
    }
  }

  static displayLists(){
    const storedDoctors = Store.getDoctors();
    const storedPatients = Store.getPatients();

    storedDoctors.forEach((Doctor) => UI.addToDocList(Doctor));
    storedPatients.forEach((Patient) => UI.addToPatList(Patient));
  }

  static addToDocList(Doctor){
    const docList = document.getElementById('doc-list');
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${Doctor.docId}</td>
    <td>${Doctor.name}</td>
    <td>${Doctor.age}</td>
    <td>${Doctor.qualification}</td>
    <td>${Doctor.experience}</td>
    <td><button class="btn btn-primary btn-sm">Edit</button></td>
    <td><button class="btn btn-sm btn-danger danger">X</button></td>
    `;
    docList.append(row);
  }

  static addToPatList(Patient){
    const patList = document.getElementById('pat-list');
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${Patient.patId}</td>
    <td>${Patient.name}</td>
    <td>${Patient.age}</td>
    <td>${Patient.disease}</td>
    <td>${Patient.gender}</td>
    <td><button class="btn btn-primary btn-sm">Edit</button></td>
    <td><button class="btn btn-sm btn-danger danger">X</button></td>
    `;
    patList.append(row);
  }

  static clearFields(){
    document.getElementById('doc-name').value = '';
    document.getElementById('doc-age').value = '';
    document.getElementById('qualification').value = '';
    document.getElementById('experience').value = '';

    document.getElementById('pat-name').value = '';
    document.getElementById('pat-age').value = '';
    document.getElementById('disease').value = '';
    document.getElementById('gender').value = 'default';
  }

  static showAlert(message ,where, alertType){
      const form = document.getElementById(`${where}-form`)
      const submit = document.getElementById(`${where}-submit`)

      const div = document.createElement('div');
      div.className = `alert alert-${alertType}`;
      div.appendChild(document.createTextNode(message));

      form.insertBefore(div, submit);

      setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static removeFromList(ele,where){
    ele.parentElement.parentElement.remove();
    UI.showAlert('Entry Removed',where,'danger');
  }
}
//Store Class
class Store{

    static addDoctor(doctor){
      let doctors = Store.getDoctors();
      doctors.push(doctor);
      localStorage.setItem('doctors',JSON.stringify(doctors));
    }

    static getDoctors(){
      let doctors;
      if(localStorage.getItem('doctors')===null){
        doctors =[];
      }
      else{
        doctors = JSON.parse(localStorage.getItem('doctors'));
      }

      return doctors;
    }

    static getDid(addBy){
      let did;
      if(localStorage.getItem('did')===null){
        did = 1000;
      }
      else{
        did = JSON.parse(localStorage.getItem('did'))+Number(addBy) ;
      }

      localStorage.setItem('did',JSON.stringify(did));
      return (JSON.parse(localStorage.getItem('did')));
    }

    static deleteDoctor(id){
      const doctors = Store.getDoctors();

      doctors.forEach((Doctor,index)=>{
        if(Doctor.docId === Number(id)){
          doctors.splice(index,1);
        }
      });

      localStorage.setItem('doctors',JSON.stringify(doctors));
      const a = Store.getDid(-1);
    }

    static addPatient(patient){
      let patients = Store.getPatients();
      patients.push(patient);
      localStorage.setItem('patients',JSON.stringify(patients));
    }

    static getPatients(){
      let patients;
      if(localStorage.getItem('patients')===null){
        patients =[];
      }
      else{
        patients = JSON.parse(localStorage.getItem('patients'));
      }

      return patients;
    }

    static getPid(addBy){
      let pid;
      if(localStorage.getItem('pid')===null){
        pid = 2000;
      }
      else{
        pid = JSON.parse(localStorage.getItem('pid'))+Number(addBy);
      }

      localStorage.setItem('pid',JSON.stringify(pid));
      return (JSON.parse(localStorage.getItem('pid')));
    }

    static deletePatient(id){
      const patients = Store.getPatients();

      patients.forEach((patient,index)=>{
        if(patient.patId === Number(id)){
          patients.splice(index,1);
        }
      });

      localStorage.setItem('patients',JSON.stringify(patients));
      const a = Store.getPid(-1);
    }

}

//Event: Change Tab
const docTab = document.getElementById('doc-tab');
const patTab = document.getElementById('pat-tab');
docTab.addEventListener('click',(e)=> { UI.changeTab('doc', 'pat'); } );
patTab.addEventListener('click',(e)=> { UI.changeTab('pat', 'doc'); } );

//Event: Display Doctor/Patient
document.addEventListener('DOMContentLoaded',UI.displayLists());

//Event: Add Doctor/Patient
document.getElementById('doc-submit').addEventListener('click',(e)=>{
    e.preventDefault();

    const name = document.getElementById('doc-name').value;
    const age = document.getElementById('doc-age').value;
    const qualification = document.getElementById('qualification').value;
    const experience = document.getElementById('experience').value;

    if(name === '' || age ==='' || qualification==='' || experience===''){
      UI.showAlert('Plese fill all the details', 'doc', 'danger');
    }
    else{
      const doctor = new Doctor(name, age, qualification, experience);

      Store.addDoctor(doctor);
      UI.showAlert('Doctor Added!','doc','success');
      UI.addToDocList(doctor);
      UI.clearFields();
    }
});

document.getElementById('pat-submit').addEventListener('click',(e)=>{
    e.preventDefault();

    const name = document.getElementById('pat-name').value;
    const age = document.getElementById('pat-age').value;
    const disease = document.getElementById('disease').value;
    const gender = document.getElementById('gender').value;

    if(name === '' || age ==='' || disease==='' || gender==='default'){
      UI.showAlert('Plese fill all the details', 'pat', 'danger');
    }
    else{
      const patient = new Patient(name, age, disease, gender);

      Store.addPatient(patient);
      UI.showAlert('Patient Added','pat', 'success');
      UI.addToPatList(patient);
      UI.clearFields();
    }
});

//Event: Remove Doctor/Patient
document.getElementById('doc-list').addEventListener('click',(e)=>{
  if(e.target.classList.contains('danger')){
    UI.removeFromList(e.target,'doc');
    Store.deleteDoctor(e.target.parentElement.parentElement.childNodes[1].textContent)
  }
});

document.getElementById('pat-list').addEventListener('click',(e)=>{
  if(e.target.classList.contains('danger')){
    UI.removeFromList(e.target,'pat');
    Store.deletePatient(e.target.parentElement.parentElement.childNodes[1].textContent)
  }
});

//Event: Edit Doctor/Patient
