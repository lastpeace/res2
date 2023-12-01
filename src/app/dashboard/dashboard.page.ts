import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  datainventory: any = [];
  jumlahInventory: number | null = null;
  id: number | null = null;
  name: string = '';
  description: string = '';
  quantity: String = '';
  category: string = '';
  modal_tambah: boolean = false;
  modal_edit: boolean = false;

  constructor(
    private _apiService: ApiService,
    private modal: ModalController
  ) {}

  ngOnInit() {
    this.getInventory();
  }

  getInventory() {
    this._apiService.tampil('tampil_inventory.php').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.datainventory = res;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  getJumlahData(): number {
    return this.datainventory.length;
  }

  reset_model() {
    this.id = null;
    this.name = '';
    this.description = '';
    this.quantity = '';
    this.category ='';
  }

  cancel() {
    this.modal.dismiss();
    this.modal_tambah = false;
    this.reset_model();
  }

  open_modal_tambah(isOpen: boolean) {
    this.modal_tambah = isOpen;
    this.reset_model();
    this.modal_tambah = true;
    this.modal_edit = false;
  }

  open_modal_edit(isOpen: boolean, idget: any) {
    this.modal_edit = isOpen;
    this.id = idget;
    console.log(this.id);
    this.ambilinventory(this.id);
    this.modal_tambah = false;
    this.modal_edit = true;
  }

  tambahinventory() {
    if (this.name != '' && this.description != '' && this.quantity != '' && this.category != '') {
      let data = {
        name: this.name,
        description: this.description,
        quantiy: this.quantity,
        category: this.category,
      };
      this._apiService.tambah(data, '/add_inventory.php').subscribe({
        next: (hasil: any) => {
          this.reset_model();
          console.log('berhasil tambah inventory');
          this.getInventory();
          this.modal_tambah = false;
          this.modal.dismiss();
        },
        error: (err: any) => {
          console.log('gagal tambah inventory');
        },
      });
    } else {
      console.log('gagal tambah inventory karena masih ada data yg kosong');
    }
  }

  hapusinventory(id: any) {
    this._apiService.hapus(id, '/delete_inventory.php?id=').subscribe({
      next: (res: any) => {
        console.log('sukses', res);
        this.getInventory();
        console.log('berhasil hapus data');
      },
      error: (error: any) => {
        console.log('gagal');
      },
    });
  }

  ambilinventory(id: any) {
    this._apiService.lihat(id, '/get_inventory.php?id=').subscribe({
      next: (hasil: any) => {
        console.log('sukses', hasil);
        let inventory = hasil;
        this.id = inventory.id;
        this.name = inventory.name;
        this.description = inventory.description;
        this.quantity = inventory.quantity;
        this.category = inventory.category;

      },
      error: (error: any) => {
        console.log('gagal ambil data');
      },
    });
  }

  editinventory() {
    let data = {
      id: this.id,
      name: this.name,
      description: this.description,
    };
    this._apiService.edit(data, '/update_inventory.php').subscribe({
      next: (hasil: any) => {
        console.log(hasil);
        this.reset_model();
        this.getInventory();
        console.log('berhasil edit inventory');
        this.modal_edit = false;
        this.modal.dismiss();
      },
      error: (err: any) => {
        console.log('gagal edit inventory');
      },
    });
  }
}
