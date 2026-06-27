import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminTopBar } from '../../components/admin/AdminTopBar';
import { RoomsDataTable } from '../../components/admin/RoomsDataTable';
import { FloatingActionToolbar } from '../../components/admin/FloatingActionToolbar';
import { Room } from '../../types/room.types';
import api from '../../lib/api';
import { Plus, X, Upload } from 'lucide-react';

export function AdminRooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pricePerNight, setPricePerNight] = useState('');
  const [maxGuests, setMaxGuests] = useState('2');
  const [bedrooms, setBedrooms] = useState('1');
  const [beds, setBeds] = useState('1');
  const [bathrooms, setBathrooms] = useState('1');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [tour3dUrl, setTour3dUrl] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isAvailable, setIsAvailable] = useState(true);

  const fetchRooms = async () => {
    setIsLoading(true);
    try {
      const response = await api.get<Room[]>('/rooms');
      setRooms(response.data);
    } catch (error) {
      console.error('Failed to fetch rooms', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setPricePerNight('');
    setMaxGuests('2');
    setBedrooms('1');
    setBeds('1');
    setBathrooms('1');
    setLocation('');
    setAddress('');
    setCity('');
    setCountry('');
    setImageUrl('');
    setImages([]);
    setTour3dUrl('');
    setIsFeatured(false);
    setIsAvailable(true);
    setEditingRoom(null);
  };

  const handleEdit = (room: Room) => {
    setEditingRoom(room);
    setTitle(room.title);
    setDescription(room.description);
    setPricePerNight(room.pricePerNight.toString());
    setMaxGuests(room.maxGuests.toString());
    setBedrooms(room.bedrooms.toString());
    setBeds(room.beds.toString());
    setBathrooms(room.bathrooms.toString());
    setLocation(room.location);
    setAddress(room.address);
    setCity(room.city);
    setCountry(room.country);
    setImages(room.images);
    setTour3dUrl(room.tour3dUrl || '');
    setIsFeatured(room.isFeatured);
    setIsAvailable(room.isAvailable);
    setIsModalOpen(true);
  };

  const handleDelete = async (room: Room) => {
    if (!window.confirm(`Are you sure you want to delete ${room.title}?`)) return;
    try {
      await api.delete(`/rooms/${room.id}`);
      setRooms(prev => prev.filter(r => r.id !== room.id));
    } catch (error) {
      alert('Failed to delete room');
    }
  };

  const handleView = (room: Room) => {
    window.open(`/room/${room.id}`, '_blank');
  };

  const addImage = () => {
    if (imageUrl && !images.includes(imageUrl)) {
      setImages([...images, imageUrl]);
      setImageUrl('');
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Fallback image if none uploaded
    const finalImages = images.length > 0 ? images : [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80'
    ];

    const payload = {
      title,
      description,
      pricePerNight: parseFloat(pricePerNight),
      maxGuests: parseInt(maxGuests),
      bedrooms: parseInt(bedrooms),
      beds: parseInt(beds),
      bathrooms: parseInt(bathrooms),
      location,
      address,
      city,
      country,
      images: finalImages,
      tour3dUrl: tour3dUrl || undefined,
      isFeatured,
      isAvailable,
      amenities: [], // Default empty or select
    };

    try {
      if (editingRoom) {
        await api.put(`/rooms/${editingRoom.id}`, payload);
      } else {
        await api.post('/rooms/create', payload);
      }
      setIsModalOpen(false);
      resetForm();
      fetchRooms();
    } catch (error) {
      console.error(error);
      alert('Failed to save room details');
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex">
      <AdminSidebar />

      <div className="flex-1 ml-[260px]">
        <AdminTopBar title="Rooms" />

        <main className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="font-headline text-2xl font-bold text-[#191c1e]">Manage Rooms</h2>
              <p className="text-sm text-[#464555] mt-0.5">Add, edit, and manage all property listings</p>
            </div>
            <button
              onClick={() => {
                resetForm();
                setIsModalOpen(true);
              }}
              className="flex items-center gap-2 bg-gradient-to-r from-admin-primary to-admin-primary-container text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" /> Add Room
            </button>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-16"><div className="w-8 h-8 border-4 border-admin-primary/20 border-t-admin-primary rounded-full animate-spin" /></div>
          ) : (
            <RoomsDataTable
              rooms={rooms}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onView={handleView}
            />
          )}
        </main>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-ambient-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold font-headline text-[#191c1e]">
                {editingRoom ? `Edit Room: ${editingRoom.title}` : 'Create New Room'}
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
                className="p-1 hover:bg-surface-container-low rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on_surface_variant uppercase">Room Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-surface-container-low border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20"
                    placeholder="e.g., Azure Panoramic Suite"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on_surface_variant uppercase">General Location</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-surface-container-low border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20"
                    placeholder="Santorini, Greece"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-on_surface_variant uppercase">Description</label>
                <textarea
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-surface-container-low border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20"
                  placeholder="Craft a compelling narrative for this room..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on_surface_variant uppercase">Price / Night ($)</label>
                  <input
                    type="number"
                    required
                    value={pricePerNight}
                    onChange={(e) => setPricePerNight(e.target.value)}
                    className="w-full bg-surface-container-low border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on_surface_variant uppercase">Max Guests</label>
                  <input
                    type="number"
                    required
                    value={maxGuests}
                    onChange={(e) => setMaxGuests(e.target.value)}
                    className="w-full bg-surface-container-low border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on_surface_variant uppercase">Bedrooms</label>
                  <input
                    type="number"
                    required
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    className="w-full bg-surface-container-low border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on_surface_variant uppercase">Bathrooms</label>
                  <input
                    type="number"
                    required
                    value={bathrooms}
                    onChange={(e) => setBathrooms(e.target.value)}
                    className="w-full bg-surface-container-low border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on_surface_variant uppercase">Address</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-surface-container-low border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20"
                    placeholder="Cliffside Path 44"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on_surface_variant uppercase">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-surface-container-low border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20"
                    placeholder="Oia"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on_surface_variant uppercase">Country</label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-surface-container-low border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20"
                    placeholder="Greece"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-on_surface_variant uppercase">3D Tour URL</label>
                <input
                  type="text"
                  value={tour3dUrl}
                  onChange={(e) => setTour3dUrl(e.target.value)}
                  className="w-full bg-surface-container-low border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20"
                  placeholder="e.g., https://my.matterport.com/show/?m=xxxxxxxxxxx"
                />
              </div>

              <div className="space-y-4">
                <label className="text-xs font-bold text-on_surface_variant uppercase block">Images</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="flex-1 bg-surface-container-low border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20"
                    placeholder="Add image URL (e.g. Unsplash URL)"
                  />
                  <button
                    type="button"
                    onClick={addImage}
                    className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold"
                  >
                    Add
                  </button>
                </div>
                
                <div className="grid grid-cols-4 gap-4">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative rounded-lg overflow-hidden aspect-video bg-surface-container-low border border-slate-200">
                      <img src={img} className="w-full h-full object-cover" alt="" />
                      <button
                        type="button"
                        onClick={() => removeImage(idx)}
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="rounded text-primary focus:ring-primary/20 border-slate-300"
                  />
                  <span className="text-sm font-semibold">Featured Property</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isAvailable}
                    onChange={(e) => setIsAvailable(e.target.checked)}
                    className="rounded text-primary focus:ring-primary/20 border-slate-300"
                  />
                  <span className="text-sm font-semibold">Listing Available</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                  className="px-6 py-2.5 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-bold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-2.5 bg-gradient-to-r from-admin-primary to-admin-primary-container text-white rounded-lg text-sm font-bold hover:opacity-90 transition-all"
                >
                  {editingRoom ? 'Update Room' : 'Publish Room'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
