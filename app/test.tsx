const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1a365d',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#4a5568',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 10,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchText: {
    marginLeft: 10,
    color: '#666',
    fontSize: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2d3748',
  },
  articlesContainer: {
    paddingRight: 16,
  },
    articleCardWrapper: {
      position: 'relative',
      width: 280,
      marginRight: 16,
    },
    articleCard: {
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
      height: '100%',
    },
 favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 4,
  },
  favoriteIcon: {
    alignSelf: 'flex-end',
    marginBottom: 8,
  },
  articleCategory: {
    color: '#4299e1',
    fontWeight: '600',
    fontSize: 12,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: 8,
  },
  articleSummary: {
    color: '#718096',
    fontSize: 14,
    lineHeight: 20,
  },
  categoriesGrid: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  newsletterCard: {
    backgroundColor: '#3182ce',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
  },
  newsletterTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  newsletterText: {
    color: '#ebf8ff',
    fontSize: 14,
    marginBottom: 16,
    lineHeight: 20,
  },
  newsletterButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  newsletterButtonText: {
    color: '#3182ce',
    fontWeight: '600',
  },
  sectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    categoryCard: {
       flexDirection: 'row',
       alignItems: 'center',
       borderRadius: 12,
       padding: 16,
       marginBottom: 12,
       shadowColor: '#000',
       shadowOffset: { width: 0, height: 1 },
       shadowOpacity: 0.1,
       shadowRadius: 3,
       elevation: 2,
     },
     categoryIconContainer: {
       borderRadius: 8,
       width: 40,
       height: 40,
       justifyContent: 'center',
       alignItems: 'center',
       marginRight: 16,
     },
     categoryTextContainer: {
       flex: 1,
     },
     categoryName: {
       fontSize: 16,
       fontWeight: '600',
       marginBottom: 4,
     },
     categoryCount: {
       fontSize: 13,
       color: '#718096',
     },
    categoryIcon: {
      opacity: 0.8,
    },
    seeAll: {
      color: '#3182ce',
      fontWeight: '500',
      fontSize: 14,
    },
});