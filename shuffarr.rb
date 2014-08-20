class ShuffList
  attr_reader :length
  def initialize(length)
    @length = length
  end

  def len_to_arr
    arr = []

    (0...length).each do |n|
      arr << n
    end

    arr
  end

  def shuff_arr
    len_to_arr.shuffle
  end
end

p ShuffList.new(110).shuff_arr
