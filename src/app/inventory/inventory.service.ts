import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private apiUrl = 'YOUR_API_URL'; // Ganti dengan URL API inventaris Anda

  constructor(private http: HttpClient) { }

  // Mengambil semua data inventaris dari API
  getInventoryData(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/inventory`);
  }

  // Mengambil detail satu item inventaris berdasarkan ID
  getInventoryItemById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/inventory/${id}`);
  }

  // Menambahkan item inventaris baru
  addInventory(newInventory: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/inventory`, newInventory);
  }

  // Memperbarui informasi item inventaris berdasarkan ID
  updateInventoryItem(id: string, updatedInventory: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/inventory/${id}`, updatedInventory);
  }

  // Menghapus item inventaris berdasarkan ID
  deleteInventoryItem(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/inventory/${id}`);
  }
}
