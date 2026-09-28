import React, { useEffect, useState } from 'react';
import useProducts from '../../hooks/useProducts';
import useAuth from '../../../auth/hooks/useAuth';
import ProductFormModal from '../components/ProductFormModal';
import ClayButton from '../../../../components/ui/ClayButton';
import { Plus, Package, Edit2, Trash2, Tag, Box } from 'lucide-react';

const SellerDashboardPage = () => {
  const { user } = useAuth();
  const { 
    items, 
    status, 
    fetchProducts, 
    createProduct, 
    updateProduct, 
    deleteProduct,
    createStatus
  } = useProducts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Filter products by current seller
  const sellerProducts = items.filter((p) => p.seller === user?.id || (typeof p.seller === 'object' && p.seller._id === user?.id));

  const totalStock = sellerProducts.reduce((sum, p) => {
    return sum + (p.sizes?.reduce((s, size) => s + (size.stock || 0), 0) || 0);
  }, 0);

  const handleCreateNew = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
    }
  };

  const handleModalSubmit = async (formData) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, formData).unwrap();
      } else {
        await createProduct(formData).unwrap();
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save product:', error);
      alert(error.message || 'Failed to save product');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Seller Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Manage your catalog and inventory</p>
        </div>
        <ClayButton onClick={handleCreateNew} icon={Plus}>
          Add Product
        </ClayButton>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="clay-card p-6 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Package size={28} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Products</p>
            <p className="text-3xl font-black text-slate-900">{sellerProducts.length}</p>
          </div>
        </div>
        <div className="clay-card p-6 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center">
            <Box size={28} />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Stock</p>
            <p className="text-3xl font-black text-slate-900">{totalStock}</p>
          </div>
        </div>
      </div>

      <div className="clay-card overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Tag size={18} className="text-blue-500" />
            Your Catalog
          </h2>
        </div>

        {status === 'loading' ? (
          <div className="p-8 text-center text-slate-400 font-medium">Loading products...</div>
        ) : sellerProducts.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
              <Package size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-700 mb-2">No products yet</h3>
            <p className="text-sm text-slate-500 mb-6">Start building your catalog by adding your first product.</p>
            <ClayButton onClick={handleCreateNew} size="sm" icon={Plus}>Add First Product</ClayButton>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="text-xs font-bold text-slate-500 uppercase bg-slate-50">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sellerProducts.map((product) => {
                  const image = product.images?.[0] || 'https://via.placeholder.com/150';
                  const totalProdStock = product.sizes?.reduce((s, size) => s + (size.stock || 0), 0) || 0;
                  
                  return (
                    <tr key={product._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img src={image} alt={product.title} className="w-12 h-12 rounded-xl object-cover border border-slate-200" />
                          <div>
                            <p className="font-bold text-slate-800 line-clamp-1">{product.title}</p>
                            <p className="text-xs text-slate-400">{product.sizes?.length || 0} variants</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-slate-700">
                        {product.price?.currency === 'USD' ? '$' : '₹'}{product.price?.amount}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                          totalProdStock > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                        }`}>
                          {totalProdStock > 0 ? `${totalProdStock} in stock` : 'Out of stock'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button 
                          onClick={() => handleEdit(product)}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
                          title="Edit Product"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(product._id)}
                          className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ProductFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={editingProduct}
        onSubmit={handleModalSubmit}
        isSubmitting={createStatus === 'loading'}
      />
    </div>
  );
};

export default SellerDashboardPage;
