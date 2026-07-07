import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminTopBar } from '../../components/admin/AdminTopBar';
import { Room } from '../../types/room.types';
import api from '../../lib/api';
import { useSearchParams } from 'react-router-dom';
import { 
  Plus, X, Search, ChevronRight, Eye, Edit, Trash, 
  MoreVertical, Lightbulb, Shield, Calendar, 
  MapPin, Image as ImageIcon, Sparkles, Sliders, Check
} from 'lucide-react';

export function AdminRooms() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<'list' | 'create' | 'edit'>('list');
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);

  // Filter & Sort states via search params
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const setSearchQuery = (val: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (val) {
      newParams.set('q', val);
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams);
  };

  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [sortBy, setSortBy] = useState('Newest First');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRoomIds, setSelectedRoomIds] = useState<string[]>([]);

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
  const [category, setCategory] = useState('Penthouse Suite');
  const [cancellationPolicy, setCancellationPolicy] = useState('Flexible (Full refund 24h prior)');
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [isNewlyAdded, setIsNewlyAdded] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('Listings with virtual 3D tours and high-resolution photo galleries see 45% higher booking conversion rates in the first 30 days of publication.');

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await api.post<{ url: string }>('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.data?.url) {
        setImages(prev => [...prev, response.data.url]);
      }
    } catch (err) {
      console.error('Image upload failed', err);
      alert('Failed to upload image. Please check API connection and try again.');
    } finally {
      setIsUploadingImage(false);
    }
  };

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
    
    const fetchSuggestion = async () => {
      try {
        const response = await api.get<{ suggestion: string }>('/analytics/suggestions?page=rooms');
        if (response.data?.suggestion) {
          setAiSuggestion(response.data.suggestion);
        }
      } catch (e) {
        console.error('Failed to fetch rooms page suggestions', e);
      }
    };
    fetchSuggestion();
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
    setCategory('Penthouse Suite');
    setCancellationPolicy('Flexible (Full refund 24h prior)');
    setIsBestSeller(false);
    setIsNewlyAdded(false);
    setEditingRoom(null);
  };

  const handleEditInit = (room: Room) => {
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
    setCategory(room.bedrooms > 2 ? 'Villa' : room.bedrooms > 1 ? 'Suite' : 'Penthouse Suite');
    setIsBestSeller(room.isFeatured && Math.random() > 0.5);
    setIsNewlyAdded(new Date(room.createdAt).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000);
    setView('edit');
  };

  const handleDelete = async (room: Room) => {
    if (!window.confirm(`Are you sure you want to delete ${room.title}?`)) return;
    try {
      await api.delete(`/rooms/${room.id}`);
      setRooms(prev => prev.filter(r => r.id !== room.id));
      setSelectedRoomIds(prev => prev.filter(id => id !== room.id));
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
      amenities: [], 
    };

    try {
      if (editingRoom) {
        await api.put(`/rooms/${editingRoom.id}`, payload);
      } else {
        await api.post('/rooms/create', payload);
      }
      setView('list');
      resetForm();
      fetchRooms();
    } catch (error) {
      console.error(error);
      alert('Failed to save room details');
    }
  };

  // Bulk actions handlers
  const handleBulkDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete the ${selectedRoomIds.length} selected rooms?`)) return;
    try {
      await Promise.all(selectedRoomIds.map(id => api.delete(`/rooms/${id}`)));
      setRooms(prev => prev.filter(r => !selectedRoomIds.includes(r.id)));
      setSelectedRoomIds([]);
    } catch (error) {
      alert('Failed to delete some rooms');
    }
  };

  const handleBulkToggleAvailable = async () => {
    try {
      await Promise.all(selectedRoomIds.map(async id => {
        const targetRoom = rooms.find(r => r.id === id);
        if (targetRoom) {
          await api.put(`/rooms/${id}`, {
            ...targetRoom,
            isAvailable: !targetRoom.isAvailable
          });
        }
      }));
      setSelectedRoomIds([]);
      fetchRooms();
    } catch (error) {
      alert('Failed to update availability');
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRoomIds(filteredRooms.map(r => r.id));
    } else {
      setSelectedRoomIds([]);
    }
  };

  const handleSelectRoom = (roomId: string) => {
    setSelectedRoomIds(prev => 
      prev.includes(roomId) ? prev.filter(id => id !== roomId) : [...prev, roomId]
    );
  };

  // Filter & Sort Logic
  const filteredRooms = rooms
    .filter(room => {
      const matchesSearch = 
        room.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        categoryFilter === 'All Categories' ||
        (categoryFilter === 'Villa' && room.bedrooms > 2) ||
        (categoryFilter === 'Suite' && room.bedrooms === 2) ||
        (categoryFilter === 'Single' && room.bedrooms === 1);

      const matchesStatus = 
        statusFilter === 'All Status' ||
        (statusFilter === 'Available' && room.isAvailable) ||
        (statusFilter === 'Booked' && !room.isAvailable); // Mock booked state for unavailable

      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'Price: Low to High') return a.pricePerNight - b.pricePerNight;
      if (sortBy === 'Price: High to Low') return b.pricePerNight - a.pricePerNight;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); // Newest First
    });

  // Pagination logic
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage) || 1;
  const paginatedRooms = filteredRooms.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex">
      <AdminSidebar />

      <div className="flex-1 ml-[260px]">
        <AdminTopBar title="Rooms" />

        {view === 'list' ? (
          <main className="p-8">
            {/* Header & Action Row */}
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-extrabold font-headline tracking-tight text-[#191c1e] mb-2">Manage Rooms</h2>
                <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 uppercase tracking-widest">
                  <span>Inventory</span>
                  <ChevronRight className="w-3 h-3 text-slate-400" />
                  <span className="text-primary">All Rooms</span>
                </nav>
              </div>
              <button
                onClick={() => {
                  resetForm();
                  setView('create');
                }}
                className="bg-gradient-to-b from-primary to-primary-container text-white px-6 py-3 rounded-lg font-bold text-sm shadow-xl hover:scale-[1.02] transition-transform active:scale-95 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Room
              </button>
            </div>

            {/* Filters Strip */}
            <div className="bg-surface-container-low rounded-xl p-4 mb-8 flex flex-wrap items-center justify-between gap-4 border border-slate-200/30">
              <div className="flex items-center gap-4 flex-1">
                <div className="relative min-w-[300px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search by name or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:outline-none"
                  />
                </div>
                <div className="h-8 w-[1px] bg-slate-200" />
                <div className="flex gap-2">
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="bg-white border border-slate-200 text-sm rounded-lg py-2 px-4 focus:ring-2 focus:ring-primary/20 cursor-pointer focus:outline-none"
                  >
                    <option>All Categories</option>
                    <option>Single</option>
                    <option>Suite</option>
                    <option>Villa</option>
                  </select>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-white border border-slate-200 text-sm rounded-lg py-2 px-4 focus:ring-2 focus:ring-primary/20 cursor-pointer focus:outline-none"
                  >
                    <option>All Status</option>
                    <option>Available</option>
                    <option>Booked</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent border-none text-sm font-semibold text-on-surface focus:ring-0 cursor-pointer focus:outline-none p-0"
                >
                  <option>Newest First</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Data Table Surface */}
            {isLoading ? (
              <div className="flex items-center justify-center py-24">
                <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
              </div>
            ) : paginatedRooms.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-16 text-center">
                <p className="text-on-surface-variant font-medium">No luxury properties found matching these criteria.</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="bg-[#f8f9fa] border-b border-slate-100">
                      <th className="py-4 px-6 w-12">
                        <input
                          type="checkbox"
                          onChange={handleSelectAll}
                          checked={paginatedRooms.length > 0 && paginatedRooms.every(r => selectedRoomIds.includes(r.id))}
                          className="rounded text-primary focus:ring-primary h-4 w-4 border-slate-300"
                        />
                      </th>
                      <th className="py-4 px-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-label">Room</th>
                      <th className="py-4 px-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-label">Location</th>
                      <th className="py-4 px-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-label">Price / Night</th>
                      <th className="py-4 px-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-label">Status</th>
                      <th className="py-4 px-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-label">Tags</th>
                      <th className="py-4 px-6 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant font-label text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {paginatedRooms.map((room) => (
                      <tr key={room.id} className="hover:bg-slate-50/80 transition-colors group">
                        <td className="py-5 px-6">
                          <input
                            type="checkbox"
                            checked={selectedRoomIds.includes(room.id)}
                            onChange={() => handleSelectRoom(room.id)}
                            className="rounded text-primary focus:ring-primary h-4 w-4 border-slate-300"
                          />
                        </td>
                        <td className="py-5 px-4">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-16 rounded-lg overflow-hidden flex-shrink-0 bg-slate-100 shadow-sm border border-slate-100">
                              <img
                                src={room.images[0] || 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=120&q=80'}
                                className="w-full h-full object-cover"
                                alt=""
                              />
                            </div>
                            <div>
                              <div className="font-bold text-sm text-on-surface font-headline leading-tight">{room.title}</div>
                              <div className="text-xs text-slate-500 mt-1">
                                {room.bedrooms > 2 ? 'Villa' : room.bedrooms > 1 ? 'Suite' : 'Single'} • {room.beds} Bed{room.beds > 1 ? 's' : ''}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-5 px-4 text-sm text-slate-600 font-medium">
                          {room.city}, {room.country}
                        </td>
                        <td className="py-5 px-4">
                          <div className="text-sm font-bold text-on-surface">${room.pricePerNight.toLocaleString()}</div>
                        </td>
                        <td className="py-5 px-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${
                            room.isAvailable 
                              ? 'bg-emerald-50 text-emerald-700' 
                              : 'bg-amber-50 text-amber-700'
                          }`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${room.isAvailable ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                            {room.isAvailable ? 'Available' : 'Booked'}
                          </span>
                        </td>
                        <td className="py-5 px-4">
                          <div className="flex flex-wrap gap-2">
                            {room.isFeatured && (
                              <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase">Featured</span>
                            )}
                            {room.pricePerNight > 1000 && (
                              <span className="px-2 py-0.5 rounded bg-teal-50 text-teal-600 text-[10px] font-bold uppercase">Luxury</span>
                            )}
                          </div>
                        </td>
                        <td className="py-5 px-6 text-right">
                          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleView(room)}
                              className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all hover:shadow-sm"
                              title="View Public Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleEditInit(room)}
                              className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all hover:shadow-sm"
                              title="Edit Listing"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(room)}
                              className="p-2 text-slate-400 hover:text-red-600 hover:bg-white rounded-lg transition-all hover:shadow-sm"
                              title="Delete Listing"
                            >
                              <Trash className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination/Footer */}
                <div className="p-4 bg-[#f8f9fa] border-t border-slate-100 flex justify-between items-center">
                  <div className="text-xs text-slate-500 font-medium">
                    Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredRooms.length)} of {filteredRooms.length} rooms
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="p-1.5 rounded hover:bg-white text-slate-400 disabled:opacity-30 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4 rotate-180" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNo => (
                      <button
                        key={pageNo}
                        onClick={() => setCurrentPage(pageNo)}
                        className={`h-8 w-8 flex items-center justify-center rounded text-xs font-bold transition-all ${
                          currentPage === pageNo
                            ? 'bg-primary text-white'
                            : 'hover:bg-white text-slate-600'
                        }`}
                      >
                        {pageNo}
                      </button>
                    ))}
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="p-1.5 rounded hover:bg-white text-slate-400 disabled:opacity-30 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Selected Actions Floating Toolbar */}
            {selectedRoomIds.length > 0 && (
              <div className="fixed bottom-8 left-1/2 -translate-x-1/2 transform z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="bg-white/80 backdrop-blur-xl px-6 py-4 rounded-full shadow-2xl border border-indigo-100 flex items-center gap-6">
                  <div className="flex items-center gap-3 pr-6 border-r border-indigo-100">
                    <span className="h-6 w-6 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                      {selectedRoomIds.length}
                    </span>
                    <span className="text-sm font-bold text-indigo-900">Rooms Selected</span>
                  </div>
                  <div className="flex items-center gap-6">
                    <button
                      onClick={handleBulkToggleAvailable}
                      className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-900 uppercase tracking-wider transition-colors"
                    >
                      <Sliders className="w-3.5 h-3.5" /> Toggle Status
                    </button>
                    <button
                      onClick={handleBulkDelete}
                      className="flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-800 uppercase tracking-wider transition-colors"
                    >
                      <Trash className="w-3.5 h-3.5" /> Delete Selected
                    </button>
                  </div>
                  <button
                    onClick={() => setSelectedRoomIds([])}
                    className="ml-4 p-1 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </main>
        ) : (
          /* Create / Edit View Shell */
          <main className="p-8 pb-32">
            <header className="mb-10 max-w-6xl mx-auto text-left">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-medium uppercase tracking-wider mb-2">
                <span>Inventory</span>
                <ChevronRight className="w-3 h-3 text-slate-400" />
                <span className="text-primary">{view === 'create' ? 'Add New Listing' : 'Edit Listing'}</span>
              </div>
              <h2 className="text-4xl font-extrabold tracking-tight font-headline text-[#191c1e]">
                {view === 'create' ? 'Create New Room' : `Edit Listing: ${title}`}
              </h2>
              <p className="text-on-surface-variant mt-2 max-w-2xl text-sm leading-relaxed">
                Publish or adjust a luxury suite in the LuxeStay ecosystem. Ensure all property details and high-resolution imagery meet our luxury brand standards.
              </p>
            </header>

            <form onSubmit={handleSubmit} className="max-w-6xl mx-auto grid grid-cols-12 gap-8 text-left">
              {/* Left Column: Main Info */}
              <div className="col-span-12 lg:col-span-8 space-y-8">
                
                {/* Section: Basic Information */}
                <section className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm space-y-6">
                  <h3 className="text-lg font-bold font-headline flex items-center gap-2 text-on-surface">
                    <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
                    Basic Information
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Room Title</label>
                        <input
                          type="text"
                          required
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="w-full bg-[#f8f9fa] border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-600/20 font-medium text-on-surface focus:outline-none"
                          placeholder="e.g., Azure Panoramic Suite"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">General Location</label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                          <input
                            type="text"
                            required
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full bg-[#f8f9fa] border-none rounded-lg pl-10 pr-4 p-3 text-sm focus:ring-2 focus:ring-indigo-600/20 font-medium text-on-surface focus:outline-none"
                            placeholder="Santorini, Greece"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Room Description</label>
                      <textarea
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full bg-[#f8f9fa] border-none rounded-lg p-4 text-sm focus:ring-2 focus:ring-indigo-600/20 font-medium text-on-surface focus:outline-none leading-relaxed"
                        placeholder="Craft a compelling narrative for this room..."
                        rows={6}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Property Category</label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full bg-[#f8f9fa] border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-600/20 font-medium text-on-surface focus:outline-none"
                        >
                          <option>Penthouse Suite</option>
                          <option>Villa</option>
                          <option>Bungalow</option>
                          <option>Studio</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Guest Capacity</label>
                        <select
                          value={maxGuests}
                          onChange={(e) => setMaxGuests(e.target.value)}
                          className="w-full bg-[#f8f9fa] border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-600/20 font-medium text-on-surface focus:outline-none"
                        >
                          <option value="2">1-2 Guests</option>
                          <option value="4">3-4 Guests</option>
                          <option value="8">5+ Guests</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Section: Layout Specifications */}
                <section className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm space-y-6">
                  <h3 className="text-lg font-bold font-headline flex items-center gap-2 text-on-surface">
                    <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
                    Layout Specifications
                  </h3>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Bedrooms</label>
                      <input
                        type="number"
                        required
                        value={bedrooms}
                        onChange={(e) => setBedrooms(e.target.value)}
                        className="w-full bg-[#f8f9fa] border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-600/20 font-medium text-on-surface focus:outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Beds</label>
                      <input
                        type="number"
                        required
                        value={beds}
                        onChange={(e) => setBeds(e.target.value)}
                        className="w-full bg-[#f8f9fa] border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-600/20 font-medium text-on-surface focus:outline-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Bathrooms</label>
                      <input
                        type="number"
                        required
                        value={bathrooms}
                        onChange={(e) => setBathrooms(e.target.value)}
                        className="w-full bg-[#f8f9fa] border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-600/20 font-medium text-on-surface focus:outline-none"
                      />
                    </div>
                  </div>
                </section>

                {/* Section: Address Details */}
                <section className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm space-y-6">
                  <h3 className="text-lg font-bold font-headline flex items-center gap-2 text-on-surface">
                    <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
                    Street Address Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2 md:col-span-1">
                      <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Street Address</label>
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full bg-[#f8f9fa] border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-600/20 font-medium text-on-surface focus:outline-none"
                        placeholder="Cliffside Path 44"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">City</label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-[#f8f9fa] border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-600/20 font-medium text-on-surface focus:outline-none"
                        placeholder="Oia"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Country</label>
                      <input
                        type="text"
                        required
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full bg-[#f8f9fa] border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-600/20 font-medium text-on-surface focus:outline-none"
                        placeholder="Greece"
                      />
                    </div>
                  </div>
                </section>

                {/* Section: Virtual Tour */}
                <section className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm space-y-6">
                  <h3 className="text-lg font-bold font-headline flex items-center gap-2 text-on-surface">
                    <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
                    Interactive Virtual Tour
                  </h3>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">3D Matterport or Virtual Tour URL</label>
                    <div className="relative">
                      <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-500 w-4 h-4" />
                      <input
                        type="text"
                        value={tour3dUrl}
                        onChange={(e) => setTour3dUrl(e.target.value)}
                        className="w-full bg-[#f8f9fa] border-none rounded-lg pl-10 pr-4 p-3 text-sm focus:ring-2 focus:ring-indigo-600/20 font-medium text-on-surface focus:outline-none"
                        placeholder="e.g. https://my.matterport.com/show/?m=xxxxxxxxxxx"
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1 font-body">Provides prospective guests with an immersive digital twin walkthrough of the suite.</p>
                  </div>
                </section>

                {/* Section: Media Assets */}
                <section className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm space-y-6">
                  <h3 className="text-lg font-bold font-headline flex items-center gap-2 text-on-surface">
                    <span className="w-1.5 h-6 bg-indigo-600 rounded-full"></span>
                    Media Assets
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex gap-4 items-center">
                      <div className="flex-1 flex gap-2">
                        <input
                          type="text"
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          className="flex-1 bg-[#f8f9fa] border-none rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-600/20 font-medium text-on-surface focus:outline-none"
                          placeholder="Paste image URL here (e.g. Unsplash image link)"
                        />
                        <button
                          type="button"
                          onClick={addImage}
                          className="bg-primary/10 hover:bg-primary/20 text-primary px-6 py-2 rounded-lg text-sm font-semibold transition-colors"
                        >
                          Add URL
                        </button>
                      </div>

                      <div className="relative">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          disabled={isUploadingImage}
                          className="hidden"
                          id="file-upload-input"
                        />
                        <label
                          htmlFor="file-upload-input"
                          className="bg-primary hover:bg-primary-container text-white px-6 py-3 rounded-lg text-sm font-semibold transition-colors cursor-pointer inline-flex items-center gap-2"
                        >
                          {isUploadingImage ? (
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            <span className="w-4 h-4 border-2 border-dashed border-white rounded-full flex items-center justify-center text-[10px] font-bold">+</span>
                          )}
                          {isUploadingImage ? 'Uploading...' : 'Upload Image'}
                        </label>
                      </div>
                    </div>

                    {images.length === 0 ? (
                      <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center bg-slate-50/50">
                        <ImageIcon className="w-10 h-10 text-slate-300 mb-2" />
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">No Images Linked</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-4 gap-4">
                        {images.map((img, idx) => (
                          <div key={idx} className="relative rounded-lg overflow-hidden aspect-video bg-slate-100 border border-slate-200 group">
                            <img src={img} className="w-full h-full object-cover" alt="" />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <button
                                type="button"
                                onClick={() => removeImage(idx)}
                                className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors shadow-sm"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </section>
              </div>

              {/* Right Column: Settings & Pricing */}
              <div className="col-span-12 lg:col-span-4 space-y-8">
                
                {/* Section: Pricing & Availability */}
                <section className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm space-y-6">
                  <h3 className="text-md font-bold font-headline flex items-center gap-2 text-on-surface">
                    <span className="w-1.5 h-4 bg-indigo-600 rounded-full"></span>
                    Listing Economics
                  </h3>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Base Nightly Rate</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-3 flex items-center text-slate-400 font-bold text-lg">$</span>
                        <input
                          type="number"
                          required
                          placeholder="0.00"
                          value={pricePerNight}
                          onChange={(e) => setPricePerNight(e.target.value)}
                          className="w-full bg-[#f8f9fa] border-none rounded-lg pl-8 pr-4 p-3 text-lg focus:ring-2 focus:ring-indigo-600/20 font-bold text-on-surface focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#f8f9fa] rounded-lg">
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-on-surface">Seasonal Pricing</p>
                        <p className="text-[10px] text-on-surface-variant">Auto-adjust rates for peak periods</p>
                      </div>
                      <button
                        type="button"
                        className="w-10 h-6 bg-indigo-600/20 rounded-full relative flex items-center px-1"
                      >
                        <span className="w-4 h-4 bg-white rounded-full shadow-sm" />
                      </button>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Promotional Tags</label>
                      <div className="space-y-2">
                        <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:border-indigo-600/40 cursor-pointer transition-all">
                          <input
                            type="checkbox"
                            checked={isFeatured}
                            onChange={(e) => setIsFeatured(e.target.checked)}
                            className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                          />
                          <span className="text-xs font-bold flex items-center gap-2">
                            <span className="w-2 h-2 bg-indigo-500 rounded-full"></span> Featured Listing
                          </span>
                        </label>
                        <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:border-indigo-600/40 cursor-pointer transition-all">
                          <input
                            type="checkbox"
                            checked={isBestSeller}
                            onChange={(e) => setIsBestSeller(e.target.checked)}
                            className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                          />
                          <span className="text-xs font-bold flex items-center gap-2">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span> Best Seller
                          </span>
                        </label>
                        <label className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:border-indigo-600/40 cursor-pointer transition-all">
                          <input
                            type="checkbox"
                            checked={isNewlyAdded}
                            onChange={(e) => setIsNewlyAdded(e.target.checked)}
                            className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                          />
                          <span className="text-xs font-bold flex items-center gap-2">
                            <span className="w-2 h-2 bg-amber-400 rounded-full"></span> Newly Added
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-[#f8f9fa] rounded-lg">
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-on-surface">Listing Available</p>
                        <p className="text-[10px] text-on-surface-variant">Toggle room listing visibility</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsAvailable(!isAvailable)}
                        className={`w-10 h-6 rounded-full relative flex items-center px-1 transition-colors ${
                          isAvailable ? 'bg-primary' : 'bg-slate-200'
                        }`}
                      >
                        <span className={`w-4 h-4 bg-white rounded-full shadow-sm absolute transition-all ${
                          isAvailable ? 'right-1' : 'left-1'
                        }`} />
                      </button>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">Cancellation Policy</label>
                      <select
                        value={cancellationPolicy}
                        onChange={(e) => setCancellationPolicy(e.target.value)}
                        className="w-full bg-[#f8f9fa] border-none rounded-lg p-3 text-xs font-bold text-on-surface focus:outline-none"
                      >
                        <option>Flexible (Full refund 24h prior)</option>
                        <option>Moderate (Full refund 5 days prior)</option>
                        <option>Strict (No refund)</option>
                      </select>
                    </div>
                  </div>
                </section>

                {/* Helpful Tips (Floating Card) */}
                <div className="bg-indigo-900 text-white p-6 rounded-xl space-y-4">
                  <Lightbulb className="w-8 h-8 text-indigo-300" />
                  <h4 className="font-bold text-sm">Optimization Tip</h4>
                  <p className="text-xs text-indigo-100/80 leading-relaxed">
                    {aiSuggestion}
                  </p>
                </div>
              </div>

              {/* Footer Action Bar (Sticky) */}
              <footer className="fixed bottom-0 right-0 left-64 bg-white/90 backdrop-blur-xl border-t border-slate-100 p-4 flex items-center justify-between z-50">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                    Draft Auto-saved
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setView('list');
                      resetForm();
                    }}
                    className="px-6 py-2.5 text-slate-600 hover:bg-slate-50 rounded-lg text-sm font-bold transition-all"
                  >
                    Cancel
                  </button>
                  {editingRoom && (
                    <button
                      type="button"
                      onClick={() => handleView(editingRoom)}
                      className="px-6 py-2.5 text-indigo-600 hover:bg-indigo-50 rounded-lg text-sm font-bold transition-all flex items-center gap-2"
                    >
                      <Eye className="w-4 h-4" /> Preview Listing
                    </button>
                  )}
                  <button
                    type="submit"
                    className="px-10 py-2.5 bg-gradient-to-b from-primary to-primary-container text-white rounded-lg text-sm font-bold shadow-lg shadow-indigo-200 hover:scale-[1.02] transition-all"
                  >
                    {view === 'create' ? 'Publish Room' : 'Update Room'}
                  </button>
                </div>
              </footer>
            </form>
          </main>
        )}
      </div>
    </div>
  );
}
