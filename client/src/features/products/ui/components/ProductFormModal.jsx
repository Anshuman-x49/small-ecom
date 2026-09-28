import React, { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { X, UploadCloud, Plus, Trash2 } from 'lucide-react';
import ClayButton from '../../../../components/ui/ClayButton';
import ClayInput from '../../../../components/ui/ClayInput';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const ProductFormModal = ({ isOpen, onClose, initialData, onSubmit, isSubmitting }) => {
  const isEditing = !!initialData;

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      price: { amount: 0, currency: 'INR' },
      sizes: [{ size: 'M', stock: 0 }],
      images: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sizes',
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        reset({
          title: initialData.title,
          description: initialData.description,
          price: initialData.price || { amount: 0, currency: 'INR' },
          sizes: initialData.sizes || [{ size: 'M', stock: 0 }],
          images: [],
        });
      } else {
        reset({
          title: '',
          description: '',
          price: { amount: 0, currency: 'INR' },
          sizes: [{ size: 'M', stock: 0 }],
          images: [],
        });
      }
    }
  }, [isOpen, initialData, reset]);

  if (!isOpen) return null;

  const handleFormSubmit = (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('price', JSON.stringify(data.price));
    formData.append('sizes', JSON.stringify(data.sizes));

    if (data.images && data.images.length > 0) {
      for (let i = 0; i < data.images.length; i++) {
        formData.append('images', data.images[i]);
      }
    }

    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">
            {isEditing ? 'Edit Product' : 'Create New Product'}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ClayInput
              id="title"
              label="Product Title"
              placeholder="E.g., Classic White Sneaker"
              error={errors.title}
              {...register('title', {
                required: 'Title is required',
                minLength: { value: 2, message: 'Min 2 characters' },
                maxLength: { value: 100, message: 'Max 100 characters' },
              })}
            />
            <div className="flex gap-2">
              <div className="flex-1">
                <ClayInput
                  id="price.amount"
                  label="Price"
                  type="number"
                  step="0.01"
                  min="0"
                  error={errors.price?.amount}
                  {...register('price.amount', {
                    required: 'Price is required',
                    valueAsNumber: true,
                    min: { value: 0, message: 'Cannot be negative' },
                  })}
                />
              </div>
              <div className="w-24">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 ml-1">
                  Currency
                </label>
                <select
                  {...register('price.currency')}
                  className="w-full h-[46px] bg-[#EEF2F6] border border-transparent rounded-xl px-3 text-sm text-slate-800 font-medium focus:outline-none focus:border-blue-500 shadow-[inset_4px_4px_8px_rgba(166,180,200,0.35),inset_-4px_-4px_8px_rgba(255,255,255,0.9)]"
                >
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 ml-1">
              Description
            </label>
            <textarea
              {...register('description', {
                required: 'Description is required',
                minLength: { value: 10, message: 'Min 10 characters' },
                maxLength: { value: 500, message: 'Max 500 characters' },
              })}
              rows="4"
              className="w-full bg-[#EEF2F6] border border-transparent rounded-xl p-3 text-sm text-slate-800 focus:outline-none focus:border-blue-500 shadow-[inset_4px_4px_8px_rgba(166,180,200,0.35),inset_-4px_-4px_8px_rgba(255,255,255,0.9)] resize-none"
              placeholder="Enter product description..."
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1 ml-1 font-medium">{errors.description.message}</p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2 ml-1">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Sizes & Stock
              </label>
              <button
                type="button"
                onClick={() => append({ size: 'M', stock: 0 })}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                <Plus size={14} /> Add Size
              </button>
            </div>
            
            <div className="space-y-3">
              {fields.map((item, index) => (
                <div key={item.id} className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="w-24">
                    <select
                      {...register(`sizes.${index}.size`, { required: true })}
                      className="w-full h-9 bg-white border border-slate-200 rounded-lg px-2 text-sm focus:outline-none focus:border-blue-500"
                    >
                      {SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="flex-1">
                    <input
                      type="number"
                      placeholder="Stock quantity"
                      min="0"
                      {...register(`sizes.${index}.stock`, { 
                        required: true, 
                        valueAsNumber: true,
                        min: 0 
                      })}
                      className="w-full h-9 bg-white border border-slate-200 rounded-lg px-3 text-sm focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    disabled={fields.length === 1}
                    className="p-2 text-slate-400 hover:text-red-500 disabled:opacity-30 cursor-pointer transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 ml-1">
              Product Images {isEditing && '(Upload new to replace)'}
            </label>
            <div className="relative">
              <input
                type="file"
                multiple
                accept="image/jpeg,image/png,image/jpg"
                {...register('images', {
                  required: isEditing ? false : 'Please upload at least one image'
                })}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="w-full h-32 border-2 border-dashed border-slate-300 rounded-2xl flex flex-col items-center justify-center bg-slate-50 text-slate-500 group-hover:border-blue-400 group-hover:bg-blue-50 transition-colors">
                <UploadCloud size={32} className="mb-2 text-slate-400" />
                <span className="text-sm font-medium">Click or drag images to upload (Max 5)</span>
                <span className="text-xs text-slate-400 mt-1">JPG, PNG up to 5MB</span>
              </div>
            </div>
            {errors.images && (
              <p className="text-xs text-red-500 mt-1 ml-1 font-medium">{errors.images.message}</p>
            )}
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <ClayButton variant="secondary" onClick={onClose}>
              Cancel
            </ClayButton>
            <ClayButton type="submit" isLoading={isSubmitting}>
              {isEditing ? 'Save Changes' : 'Create Product'}
            </ClayButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductFormModal;
