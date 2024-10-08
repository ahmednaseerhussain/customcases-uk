'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Badge, ChevronDown, ChevronUp } from 'lucide-react';
import { products, Product } from "@/config/products";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

const getUniqueValues = (key: keyof Product): string[] => {
  const rawValues = products.flatMap((product) => product[key]);
  const stringValues = rawValues as unknown[];
  return [...new Set(stringValues.map((val) => typeof val === 'string' ? val : JSON.stringify(val)))];
};

interface FiltersState {
  deviceSeries: string[];
  devices: string[];
  caseType: string[];
  customization: string[];
  designColour: string[];
}

interface ExpandedFiltersState {
  deviceSeries: boolean;
  devices: boolean;
  caseType: boolean;
  customization: boolean;
  designColour: boolean;
}

export default function ProductDetails() {
  const [filters, setFilters] = useState<FiltersState>({
    deviceSeries: [],
    devices: [],
    caseType: [],
    customization: [],
    designColour: [],
  });

  const [sortBy, setSortBy] = useState<string>('bestSelling');
  const [expandedFilters, setExpandedFilters] = useState<ExpandedFiltersState>({
    deviceSeries: true,
    devices: false,
    caseType: false,
    customization: false,
    designColour: false,
  });

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const toggleFilter = (filterName: keyof FiltersState) => {
    setExpandedFilters((prev) => ({ ...prev, [filterName]: !prev[filterName] }));
  };

  const handleFilterChange = (filterType: keyof FiltersState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter((item) => item !== value)
        : [...prev[filterType], value],
    }));
  };

  const filteredProducts = products.filter((product) => {
    const filterChecks = [
      filters.deviceSeries.length === 0 || filters.deviceSeries.includes(product.deviceSeries.join(' ')),
      filters.devices.length === 0 || filters.devices.includes(product.devices.join(' ')),
      filters.caseType.length === 0 || filters.caseType.includes(product.caseType.join(' ')),
      filters.customization.length === 0 || filters.customization.includes(product.customization.join(' ')),
      filters.designColour.length === 0 || filters.designColour.includes(product.designColour.join(' ')),
    ];
    return filterChecks.every(Boolean);
  });

  // Sorting logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'bestSelling':
        return 0; // Custom logic for best selling can be added
      case 'priceAsc':
        return parseFloat(a.discountedPrice) - parseFloat(b.discountedPrice);
      case 'priceDesc':
        return parseFloat(b.discountedPrice) - parseFloat(a.discountedPrice);
      case 'newest':
        return b.id - a.id; // Assuming a higher ID means a newer product
      default:
        return 0;
    }
  });

  return (
    
    <MaxWidthWrapper >
    <div className="container mx-auto px-4 py-8">
      <div className="text-sm breadcrumbs mb-4 ">
        <ul>
          <li className='inline-block pr-2'><Link href="/">Home  &gt;</Link></li>
          <li className='inline-block'><Link href='/collections'>All Products</Link></li>
        </ul>
      </div>

      <h1 className="text-3xl font-[400] mb-6 pt-5">Find Your Best Fit</h1>
      <h2 className='text-2xl font-[200] mb-6 pt-5'>Custom Cases made 100% by you</h2>
      <p className='text-xl font-[200] mb-6 pt-5'>Have you ever wanted a unique and creative phone case without having to spend hours making it? Then we have the solution for you. Pick one of our picture designs and simply upload your pictures or create your custom phone case from scratch!</p>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Mobile Filter Button */}
        <div className="md:hidden">
          <Button onClick={() => setIsMobileFilterOpen(true)} className="mb-4">
            Show Filters
          </Button>
        </div>

        {/* Filters */}
        <div
          className={`fixed inset-0 z-30 bg-transparent  transform ${
            isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full'
          } md:relative md:translate-x-0 md:w-1/4 transition-transform duration-300 ease-in-out`}>
          <div className="p-4 flex justify-between items-center border-t-[1px] border-x-[1px] border-b-[0] rounded-t-[10px] bg-white/100 border-blue-200/25 bg-gradient-to-tr from-blue-300/15 to-pink-300/5 backdrop-blur-lg transition-all shadow-md">
            <h2 className="text-lg font-[400] py-2">Filter:</h2>
            <button
              className="md:hidden text-lg"
              onClick={() => setIsMobileFilterOpen(false)}>
              ✕
            </button>
          </div>

          {/* Sort Dropdown (Mobile View) */}
          <div className="md:hidden p-4 bg-white/100 border-blue-200/25 bg-gradient-to-tr from-blue-300/15 to-pink-300/5 backdrop-blur-lg transition-all shadow-md">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bestSelling">Best selling</SelectItem>
                <SelectItem value="priceAsc">Price: Low to High</SelectItem>
                <SelectItem value="priceDesc">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-y-auto h-auto border rounded-b-[10px] bg-white/100 border-blue-200/25 bg-gradient-to-tr from-blue-300/15 to-pink-300/5 backdrop-blur-lg transition-all shadow-md">
            {/* Device Series Filter */}
            <FilterSection
              title="Device Series"
              isExpanded={expandedFilters.deviceSeries}
              toggleFilter={() => toggleFilter('deviceSeries')}
              options={getUniqueValues('deviceSeries')}
              selectedOptions={filters.deviceSeries}
              handleFilterChange={(option) => handleFilterChange('deviceSeries', option)}
            />
            {/* Devices Filter */}
            <FilterSection
              title="Devices"
              isExpanded={expandedFilters.devices}
              toggleFilter={() => toggleFilter('devices')}
              options={getUniqueValues('devices')}
              selectedOptions={filters.devices}
              handleFilterChange={(option) => handleFilterChange('devices', option)}
            />
            {/* Case Type Filter */}
            <FilterSection
              title="Case Type"
              isExpanded={expandedFilters.caseType}
              toggleFilter={() => toggleFilter('caseType')}
              options={getUniqueValues('caseType')}
              selectedOptions={filters.caseType}
              handleFilterChange={(option) => handleFilterChange('caseType', option)}
            />
            {/* Customization Filter */}
            <FilterSection
              title="Customization"
              isExpanded={expandedFilters.customization}
              toggleFilter={() => toggleFilter('customization')}
              options={getUniqueValues('customization')}
              selectedOptions={filters.customization}
              handleFilterChange={(option) => handleFilterChange('customization', option)}
            />
            {/* Design Color Filter */}
            <FilterSection
              title="Design Colour"
              isExpanded={expandedFilters.designColour}
              toggleFilter={() => toggleFilter('designColour')}
              options={getUniqueValues('designColour')}
              selectedOptions={filters.designColour}
              handleFilterChange={(option) => handleFilterChange('designColour', option)}
            />
          </div>
        </div>

        {/* Product Grid */}
        <div className="w-full md:w-3/4 ">
          {/* Sort Dropdown (Desktop View) */}
          <div className="hidden md:flex justify-end mb-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px] selection:bg-black  bg-white/100 border-blue-200/25 bg-gradient-to-tr from-blue-300/15 to-pink-300/5 backdrop-blur-lg transition-all shadow-md">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bestSelling">Best selling</SelectItem>
                <SelectItem value="priceAsc">Price: Low to High</SelectItem>
                <SelectItem value="priceDesc">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map((product) => (
              <div key={product.id} className="hover:zoom-in-50 border flex justify-center items-center rounded-lg overflow-hidden  bg-white/100 border-blue-200/25 bg-gradient-to-tr from-blue-300/15 to-pink-300/5 backdrop-blur-lg transition-all shadow-md">
                <Link href={`/products/${product.id}`}>
                <div className="p-4 flex flex-col items-center gap-2">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="object-cover w-36 justify-center flex"
                  />
                  <h3 className="font-semibold flex justify-center items-center text-center">{product.title}</h3>
                  
                  <div className="mt-2 flex justify-center items-center">
                    <span className="font-bold">{product.discountedPrice}</span>
                    <span className="text-sm line-through text-gray-500">{product.price}</span>
                  </div>
                </div>
                </Link>
              </div>
            ))}
          </div>
          </div>
      </div>
    </div>
    </MaxWidthWrapper>
  );
}

interface FilterSectionProps {
  title: string;
  isExpanded: boolean;
  toggleFilter: () => void;
  options: string[];
  selectedOptions: string[];
  handleFilterChange: (option: string) => void;
}

function FilterSection({
  title,
  isExpanded,
  toggleFilter,
  options,
  selectedOptions,
  handleFilterChange,
}: FilterSectionProps) {
  return (
    
    <div className="p-4">
      <div className="flex justify-between items-center cursor-pointer" onClick={toggleFilter}>
        <h3 className="font-semibold">{title}</h3>
        {isExpanded ? <ChevronUp /> : <ChevronDown />}
      </div>
      {isExpanded && (
        <div className="flex flex-col mt-2">
          {options.map((option) => (
            <label key={option} className="flex items-center space-x-2">
              <Checkbox
                checked={selectedOptions.includes(option)}
                onCheckedChange={() => handleFilterChange(option)}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
