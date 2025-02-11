import { FEATURE_CATEGORIES } from '../constants';

const featureCategorySet = new Set( Object.values( FEATURE_CATEGORIES ) );

export const isFeatureCategory = ( categorySlug: string ) => featureCategorySet.has( categorySlug );

export const getCategoryType = ( categorySlug: string ) => {
	if ( featureCategorySet.has( categorySlug ) ) {
		return 'feature';
	}

	return 'subject';
};
